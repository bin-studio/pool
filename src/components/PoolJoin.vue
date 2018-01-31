<template>
  <div>
    <header class="border-bottom clearfix">
      <div class="bg-dots col col-4">
        <popout class="tbl-row p2 flex flex-column justify-between" @click="tab('give')" :pop="edit === 'give'">
          <div>Give</div>
          <div class="relative">
            <span class="absolute left-0 bottom-0">$</span><input class="block col-12 pl2 input-number" type="number" v-model="join.amount" min="1" @focus="tab('give', false)" @click.stop="stopProp">
          </div>
        </popout>
      </div>
      <div class="bg-dots col col-4 border-left">
        <popout class="tbl-row p2 flex flex-column justify-between" @click="tab('duration')" :pop="edit === 'duration'">
          <div>Monthly for</div>
          <div class="nowrap"><input class="input-number input-number--2digits" type="number" min="1" v-model="join.duration" @focus="tab('duration', false)" @click.stop="stopProp"> Month<span v-show="join.duration > 1">s</span></div>
        </popout>
      </div>
      <div class="bg-dots col col-4 border-left">
        <popout class="tbl-row p2 flex flex-column justify-between" @click="tab('share')" :pop="edit === 'share'">
          <div>Share</div>
          <div><input type="number" class="input-number input-number--3digits" v-model="join.share" @focus="tab('share', false)" @click.stop="stopProp">%</div>
        </popout>
      </div>
    </header>
    <!-- Slider
    <div class="bg-dots" @click="edit === null ? edit = 'give' : null">
      <popout class="tbl-row bg-yellow" :pop="edit !== null"></popout>
    </div>
    -->
    <footer>
      <button @click="deploy(join)" class="btn block col-12 bg-blue white">
        Jump in the Pool
      </button>
    </footer>
  </div>
</template>

<script>
import Popout from './Popout'
import {mapActions} from 'vuex'
export default {
  name: 'JoinPool',
  components: {
    Popout
  },
  data () {
    return {
      edit: null,
      join: {
        amount: 5000,
        duration: 6,
        share: 50
      },
      durationInput: false
    }
  },
  watch: {
    join: {
      handler: function (val) {
        val.amount = val.amount < 0 ? 0 : val.amount
        val.duration = val.duration < 1 ? 1 : val.duration
        if (val.share < 0) val.share = 0
        if (val.share > 100) val.share = 100
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'subscribe'
    ]),
    tab (tab, toggle = true) {
      if (toggle) {
        this.edit = tab === this.edit ? null : tab
      } else {
        this.edit = tab
      }
    },
    stopProp () {}
  }
}
</script>
