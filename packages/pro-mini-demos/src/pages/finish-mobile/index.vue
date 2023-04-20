<template>
  <view class="content">
    <demo-block title='基础用法'>
      <pm-button @click="onOpen">complete mobile</pm-button>
      <pm-finish-mobile :phoneLeft='phoneLeft'
                           :phoneRight='phoneRight'
                           :show="isFinishMobilePopupShow"
                           @confirmComplete='confirmComplete'
                           @close="isFinishMobilePopupShow = false"
                           @afterFinishMobile="afterFinsihMobile" />
    </demo-block>
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  isFinishMobilePopupShow = false

  phoneLeft = '133'

  phoneRight = '2255'

  confirmComplete(partialPhone) {
    console.log('confirmComplete', partialPhone)
  }

  afterFinsihMobile() {
    this.onClose()
  }

  onOpen() {
    this.isFinishMobilePopupShow = true
  }

  onClose() {
    this.isFinishMobilePopupShow = false
  }
}
</script>

<style lang='scss'>
@mixin center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  background: #eff2f5;
  min-height: 100vh;
}

.popup-content {
  background: #fff;
  width: 200px;
  height: 100px;
  border-radius: 10px;
  @include center;
}
</style>
