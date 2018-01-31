import axios from 'axios'

export default {
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
