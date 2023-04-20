<template>
  <view class="content">
    <image class="logo"
           src="/static/logo.png"></image>
    <view>
      <text class="title">{{title}}</text>
      <pm-button @click="onOpen">click</pm-button>
      <u-modal v-model="show"
               content="content"></u-modal>
    </view>
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import pmButton from '@focus/pro-mini-components/src/components/pm-button/index.vue'

@Component({
  pmButton
})
export default class PmModal extends Vue {
  show = false

  onOpen() {
    this.show = true
  }
}
</script>

<style lang='scss'>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
