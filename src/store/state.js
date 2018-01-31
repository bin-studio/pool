export default {
  account: null,
  network: null,
  unlocked: null,
  currentPool: null,
  deploySteps: {
    sign: 0,
    submit: 0,
    confirm: 0,
    complete: 0
  },
  msg: 'Welcome to the Pool Party',
  pool: {}, // from blockchain :)
  pools: [] // from api.pool.ac
}
