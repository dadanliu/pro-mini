<template>
  <pm-popup :visible="show"
            :need-fuzzy="true"
            :zIndex="999"
            @close="close">
    <view class="img-container-wrapper">
      <view class='img-container'>
        <image class="img"
               mode="widthFix"
               :src="imgSrc" />
      </view>
    </view>
  </pm-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import PmPopup from '../pm-popup/index.vue'

@Component<TakeLookCard>({ PmPopup })
export default class TakeLookCard extends Vue {
  /**
   * 图片地址
   */
  @Prop({ type: String }) imgSrc!: string

  /**
   * 开关弹窗
   */
  @Prop({ type: Boolean, default: false }) show!: boolean

  /**
   * 延迟打开
   */
  delayShow = false

  /**
   * 图片尺寸
   */
  imgSize: { width: string; height?: string } = {
    width: '260px',
  }

  /**
   * 打开
   */
  @Watch('show', { immediate: true })
  onShowChange(newValue) {
    /* 无照片使用相册 */
    if (!newValue) {
      this.delayShow = false
      return
    }
    this.openImage()
  }

  /**
   * @vuese
   * 关闭
   */
  @Emit('close')
  handleClose() {}
  
  /**
   * @vuese
   * 关闭
   */
  close(): void {
    this.handleClose()
    this.delayShow = false
  }

  /**
   * @vuese
   * 打开
   */
  openImage() {
    this.delayShow = true
  }
}
</script>
<style lang="scss" scoped>
.img-container-wrapper {
  width: 320 * 2rpx;
  height: 383px;
  border-radius: 10rpx;
  position: relative;
  padding-bottom: 44px;
  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 383px;
    .img {
      width: 300px;
    }
  }
}
</style>
