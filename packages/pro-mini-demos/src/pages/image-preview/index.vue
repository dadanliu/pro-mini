<template>
  <view class="content">
    <demo-block title='基础用法'>
      <image class='imagePreview'
             :src='previewImg'
             @click='preview ' />

      <pm-image-preview :imgSrc='previewImg'
                        :show='previewVisible'
                        @close='closePreview' />
    </demo-block>
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import previewImg from './image.jpeg'

@Component({})
export default class extends Vue {
  /**
   * 开关预览
   */
  previewVisible = false

  /**
   * 图片地址
   */
  previewImg = previewImg

  /**
   * @vuese
   * 关闭弹窗
   */
  closePreview() {
    this.previewVisible = false
  }

  /**
   * @vuese
   * 打开弹窗
   */
  preview() {
    this.previewVisible = true
  }
}
</script>

<style lang='scss'>
.content {
  background: #eff2f5;
  min-height: 100vh;
}
.imagePreview {
  width: 100px;
  height: 250px;
}
</style>
