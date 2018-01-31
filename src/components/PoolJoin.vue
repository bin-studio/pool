<template>
  <div>
    <header class="border-bottom clearfix">
      <div class="bg-dots col col-4">
        <popout class="tbl-row p2 flex flex-column justify-between" @click="tab('give')" :pop="edit === 'give'">
          <div>Give</div>
          <div>$<input class="inline-block input-number" type="number" v-model="join.amount" min="1" @focus="tab('give')" @click.stop="stopProp"></div>
        </popout>
      </div>
      <div class="bg-dots col col-4 border-left">
        <popout class="tbl-row p2 flex flex-column justify-between" @click="tab('duration')" :pop="edit === 'duration'">
          <div>Monthly for</div>
          <div class="nowrap"><input class="input-number input-number--2digits" type="number" min="1" v-model="join.duration" @focus="tab('duration')" @click.stop="stopProp"> Month<span v-show="join.duration > 1">s</span></div>
        </popout>
      </div>
      <div class="bg-dots col col-4 border-left">
        <popout class="tbl-row p2 flex flex-column justify-between" @click="tab('share')" :pop="edit === 'share'">
          <div>Share</div>
          <div><input type="number" class="input-number input-number--3digits" v-model="join.share">%</div>
        </popout>
      </div>
    </header>
    <!-- Slider
    <div class="bg-dots" @click="edit === null ? edit = 'give' : null">
      <popout class="tbl-row bg-yellow" :pop="edit !== null"></popout>
    </div>
    -->
    <footer>
      <button class="btn block col-12 bg-blue white">
        Jump in the Pool
      </button>
    </footer>
  </div>
</template>

<script>
import Popout from './Popout'
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
    edit () {
      var min1 = (val) => parseInt(val) < 0 ? 1 : val
      this.join.amount = min1(this.join.amount)
      this.join.duration = min1(this.join.duration)
      if (this.join.share < 0) this.join.share = 0
      if (this.join.share > 100) this.join.share = 100
    }
  },
  methods: {
    tab (tab) {
      this.edit = tab === this.edit ? null : tab
    },
    stopProp () {}
  }
}
</script>
