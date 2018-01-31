import Web3 from 'web3'
import axios from 'axios'

import PoolContractArtifacts from '../../eth_contracts/build/contracts/Patron.json'
// const BN = web3.utils.BN
import ZeroClientProvider from 'web3-provider-engine/zero.js'
window.deleteIt = function (address) {
  axios.delete('https://api.pool.ac/pools/' + address)
}
let poolContract = null
export default {
  initWeb3 ({state, commit, dispatch}) {
    return new Promise((resolve, reject) => {
      // check for aedentity app
      if (global.web3) {
        var web3Provider = global.web3.currentProvider
        // attempt to try again if no aedentity app or metamask
      // } else if (this.options.connectionRetries > 0){
      //   this.options.connectionRetries -= 1
      //   setTimeout(() => {
      //     console.log('try to connect again')
      //     this.initWeb3().then(resolve).catch((error) => {
      //       reject(new Error(error))
      //     })
      //   }, 1000)
      //   // revert to a read only version using infura endpoint
      } else {
        this.readOnly = true
        web3Provider = ZeroClientProvider({
          getAccounts: function () {},
          // rpcUrl: 'https://mainnet.infura.io',
          // rpcUrl: 'https://testnet.infura.io',
          rpcUrl: 'https://rinkeby.infura.io'
          // rpcUrl: 'https://kovan.infura.io',
        })
      }

      if (web3Provider) {
        global.web3 = new Web3(web3Provider)
        dispatch('startChecking')
      }
    })
  },
  startChecking ({dispatch}) {
    setInterval(() => {
      dispatch('check')
    }, 1000)
  },
  check ({dispatch}) {
    dispatch('checkNetwork')
    dispatch('checkAccount')
  },
  checkNetwork ({state, commit, dispatch}) {
    return global.web3.eth.net.getId((err, netId) => {
      if (err) console.error(err)
      if (!err && state.network !== netId) {
        commit('UPDATE_NETWORK', netId)
        dispatch('deployContract')
      }
    })
  },
  checkAccount ({state, commit}) {
    return global.web3.eth.getAccounts((error, accounts) => {
      if (error) throw new Error(error)
      if (accounts.length && state.account !== accounts[0]) {
        commit('UPDATE_UNLOCKED', true)
        commit('UPDATE_ACCOUNT', accounts[0])
      } else if (!accounts.length) {
        commit('UPDATE_UNLOCKED', false)
        commit('UPDATE_ACCOUNT', null)
      }
    })
  },
  subscribe ({state, commit}, joinData) {
    console.log(joinData)
  },
  deploy ({state, commit, dispatch}, pool) {
    let utils = global.web3.utils

    console.log(pool)
    console.log(PoolContractArtifacts.abi)
    var contract = new global.web3.eth.Contract(PoolContractArtifacts.abi)
    // this.deploying = true

    let ropstenBaseToken = '0x882ceff101cd49deb83e9b6f4b74473187af2b3b'
    let rinkebyBaseToken = '0x0806ba7d6dabc06a480988205c49e78af265ed57'
    console.log(state.network === 4 ? 'is rinkeby' : 'is not rinkeby')

    let ganache = '0x8cdaf0cd259887258bc13a92c0a6da92698644c0'

    let baseToken = state.network === 4 ? rinkebyBaseToken : ropstenBaseToken
    baseToken = ganache
    commit('INC_DEPLOY_STEP', 'two')

    let args = [pool.name, pool.symbol, baseToken, '18', '0', '1']
    let options = {
      value: utils.toWei('0.001'),
      from: state.account,
      gas: '3200000',
      gasPrice: '20000000000'
    }
    console.log(args)
    console.log(options)

    contract.deploy({
      arguments: args,
      data: PoolContractArtifacts.bytecode
    }).send(options, function (e, hash) {
      commit('INC_DEPLOY_STEP', 'two')
      commit('INC_DEPLOY_STEP', 'three')
      console.log('tx')
      // this.deploying = false
      // this.confirming = true
      // this.tx = transactionHash
    }).on('error', () => {
      commit('SET_DEPLOY_STEP', {step: 'three', val: 0})
      console.log('error')
      // this.confirming = false
      // this.deploying = false
      // this.setLoading(false)
      // this.addNotification({
      //   text: 'Error has occured, please check logs',
      //   class: 'error'
      // })
    }).then((newContractInstance) => {
      commit('INC_DEPLOY_STEP', 'three')
      commit('SET_DEPLOY_STEP', {step: 'three', val: 2})
      console.log('done')
      poolContract = newContractInstance
      // this.setLoading(false)
      // this.confirming = false
      console.log(poolContract)
      commit('INC_DEPLOY_STEP', 'four')
      axios.post(apiUrl('/pools'), {
        address: poolContract.options.address,
        ownerAddress: state.account,
        name: pool.name,
        symbol: pool.symbol,
        type: 'linear',
        base: 'DAI',
        baseAddress: baseToken,
        links: []
      }).then(({ data }) => {
        commit('INC_DEPLOY_STEP', 'four')
        dispatch('getPools')
      }).catch((err) => {
        console.log(err)
      })
      commit('UPDATE_CURRENT_POOL', poolContract.options.address)
      // this.address = newContractInstance.options.address
    })
  },
  deployContract ({state, commit}) {
    if (state.currentPool) {
      poolContract = new global.web3.eth.Contract(PoolContractArtifacts.abi, state.currentPool)
    }
  },
  callConstant ({commit}, functionName, parameters) {
    if (!poolContract) return Promise((resolve, reject) => { resolve() })
    return poolContract.methods[functionName].call(...parameters)
  },
  callTransaction ({commit}, functionName, parameters) {
    if (!poolContract) return Promise((resolve, reject) => { resolve() })
    return poolContract.methods[functionName].send(...parameters)
  },
  getBondBalance ({commit}) {
    if (!poolContract) return
    return poolContract.methods.getBalance.call().then((balance) => {
      console.log(balance)
    })
  },
  getPools ({ commit }) {
    axios.get(apiUrl('/pools')).then(({ data }) => {
      commit('GET_POOLS', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  getPoolDb ({ commit }, address) {
    axios.get(apiUrl(`/pools/${address}`)).then(({ data }) => {
      commit('GET_POOL_DB', data)
    }).catch((err) => {
      console.log(err)
    })
  },

  updateContract ({ commit }, contract) {
    axios.put(apiUrl(`/pools/${contract.address}`), contract).then(({ data }) => {
      commit('GET_POOL_DB', data)
    }).catch((err) => {
      console.log(err)
    })
  }
}

function apiUrl (endpoint) {
  return process.env.API_BASE + endpoint
}
