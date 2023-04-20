<template>
  <view class="content">
    <demo-block title='基础用法'>
      <pm-py-selector ref='selectStore'
                      v-model='storeIdList'
                      :options="storeList" />
    </demo-block>
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  storeIdList = []

  storeList = [
    { label: 'aconanme1', value: 0 },
    { label: 'econanme1', value: 10 },
    { label: 'iconanme1', value: 1 },
    { label: 'iconanme2', value: 2 },
    { label: 'iconanme3', value: 3 },
    { label: 'iconanme4', value: 4 },
    { label: 'iconanme5', value: 5 },
    { label: 'iconanme6', value: 6 }
  ]

  onUnload() {
    this.$refs.selectStore && this.$refs.vSelectBottom.hide()
  }
}
</script>

<style lang='scss'>
</style>
