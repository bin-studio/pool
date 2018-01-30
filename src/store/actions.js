import axios from 'axios'

export default {
  getPools ({ commit }) {
    axios.get(apiUrl('/pools')).then(({ data }) => {
      commit('GET_POOLS', data)
    }).catch((err) => {
      console.log(err)
    })
  }
}

function apiUrl (endpoint) {
  return process.env.API_BASE + endpoint
}
