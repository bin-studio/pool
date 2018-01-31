export default {
  GET_POOLS (state, pools) {
    state.pools = pools
  },
  GET_POOL_DB (state, pool) {
    state.pool = pool
  },
  UPDATE_NETWORK (state, network) {
    state.network = network
  },
  UPDATE_UNLOCKED (state, unlocked) {
    state.unlocked = unlocked
  },
  UPDATE_ACCOUNT (state, account) {
    state.account = account
  }
}
