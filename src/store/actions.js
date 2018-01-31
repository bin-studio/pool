import Web3 from 'web3'
import axios from 'axios'
import PoolContractArtifacts from '../../eth_contracts/build/contracts/Patron.json'
// const BN = web3.utils.BN
import ZeroClientProvider from 'web3-provider-engine/zero.js'

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
  deploy ({state, commit}, pool) {
    console.log(pool)
    var contract = new global.web3.eth.Contract(PoolContractArtifacts.abi)
    // this.deploying = true
    contract.deploy({
      data: PoolContractArtifacts.abi.bytecode,
      // arguments: [this.name, this.founderName],
      from: state.account
    }).send({
      from: state.account
      // gas: '4200000'
      // gasPrice: '4000000000'
    }, (e, transactionHash) => {
      // this.deploying = false
      // this.confirming = true
      // this.tx = transactionHash
    }).on('error', () => {
      // this.confirming = false
      // this.deploying = false
      // this.setLoading(false)
      // this.addNotification({
      //   text: 'Error has occured, please check logs',
      //   class: 'error'
      // })
    }).then((newContractInstance) => {
      poolContract = newContractInstance
      // this.setLoading(false)
      // this.confirming = false
      commit('UPDATE_CURRENT_POOL', newContractInstance.options.address)
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
