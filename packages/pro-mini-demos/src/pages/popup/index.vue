<template>
  <view class="content">
    <demo-block title='基础用法'>
      <pm-button @click="onOpen">click</pm-button>
      <pm-popup :visible="show"
                @close="onClose">
        <view class='popup-content'>
          自定义 pop-up 内容
        </view>
      </pm-popup>
    </demo-block>
  </view>
</template>

<script>
import { Component, Vue, Emit } from 'vue-property-decorator'
// import pmPopup from '@focus/pro-mini-components/src/components/pm-popup/index.vue'
// import pmButton from '@focus/pro-mini-components/src/components/pm-button/index.vue'

@Component({
  // pmPopup,
  // pmButton
})
export default class extends Vue {
  show = false

  onOpen() {
    this.show = true
  }

  onClose() {
    this.show = false
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
