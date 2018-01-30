<template>
  <div class="tbl-row relative flex items-center px2">
    <slot></slot>
    <div class="tbl-row__checkbox flex items-center justify-center absolute top-0 bottom-0 right-0 border-left">
      <div class="icon icon-check" v-show="status === 'passed'"></div>
      <div class="icon icon-loading-1" v-show="status === 'processing'"></div>
      <div class="icon icon-check opacity-qrtr" v-show="status === 'queued'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusRow',
  props: {
    status: {
      type: String,
      default: 'passed'
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.statusrow__icon{
  width:calc(66/12*1rem);
}
</style>
