<template>
  <pm-popup :visible="show"
            @close="onClose">
    <view class="finish-mobile__box">
      <view class="finish-mobile__header">
        <view>
          <view class="finish-mobile__header_text"> {{ title || '请补全手机号' }} </view>
          <slot></slot>
        </view>
      </view>
      <view class="finish-mobile__line" />

      <view class="finish-mobile__telephone">
        <view class="finish-mobile__telephone_inner">
          <view class="finish-mobile__telephone_left">{{ phoneRight }}</view>
          <view class="finish-mobile__telephone-wrapper">
            <!-- v-if 配合 focus 解决首次不弹起问题、切换页面时外层v-if=false结果内层focus true导致数字键盘弹起问题 -->
            <pm-code-input v-if="show"
                           v-model="partialPhone"
                           :focus="true"
                           :maxlength="4"
                           border-color="#FCA37E"
                           size="72"
                           width-size="50"
                           font-size="48"
                           :bold="true" />
          </view>
          <view class="finish-mobile__telephone_right">{{
            phoneRight
          }}</view>
        </view>
      </view>
      <button class="finish-mobile__submit"
              :disabled="partialPhone.length !== 4"
              @click="submit">
        确定
      </button>
    </view>
  </pm-popup>
</template>

<script lang="ts">
import { Emit, Component, Vue, Prop, Watch } from 'vue-property-decorator'
import PmCodeInput from '../pm-code-input/index.vue'

@Component({
  PmCodeInput,
})
export default class extends Vue {
  /**
   * 标题
   */
  @Prop({ type: String, default: '' }) readonly title!: string

  /**
   * 手机号前四位
   */
  @Prop({ type: String, default: '' }) readonly phoneLeft!: string

  /**
   * 手机号后四位
   */
  @Prop({ type: String, default: '' }) readonly phoneRight!: string

  /**
   * 开关弹窗
   */
  @Prop({ type: Boolean, default: false }) readonly show!: boolean

  /**
   * 最大长度
   */
  maxlength = 4

  /**
   * 焦点控制
   */
  autoFocus = ''

  /**
   * 补全手机号
   */
  partialPhone = ''

  /**
   * 焦点控制
   */
  @Watch('show')
  onShowChange(val) {
    this.$nextTick(() => {
      this.autoFocus = val
    })
  }

  /**
   * 关闭时调用
   */
  @Emit('close')
  onClose(): void {}

  /**
   * 补全的手机号内容
   */
  @Emit('confirmComplete')
  confirmComplete() {
    return this.partialPhone
  }

  /**
   * @vuese
   * 提交
   */
  submit(): void {
    this.confirmComplete()
  }
}
</script>

<style scoped lang="scss">
.code {
  width: 24rpx;
  height: 24rpx;
  font-size: 24rpx;
  line-height: 24px;
  color: #ffffff;
  margin-right: 4rpx;
}

.finish-mobile {
  &__box {
    width: 650rpx;
    height: 644rpx;
    background: #ffffff;
    border-radius: 8rpx;
    padding: 80rpx 50rpx 70rpx;
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    align-items: center;
    // justify-content: center;
    margin-bottom: 26rpx;
  }
  &__submit {
    display: flex;
    height: 100rpx;
    align-items: center;
    justify-content: center;
    background: #fb7c47;
    margin: 0 auto;
    font-size: 32rpx;
    width: 468rpx;
    color: white;
    &[disabled] {
      background: #fca37e;
      color: #ffffff;
    }
  }
  &__telephone {
    height: 232rpx;
    line-height: 48rpx;
    padding-top: 30rpx;
    letter-spacing: 4rpx;
  }
  &__telephone_inner {
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    font-size: 48rpx;
    display: flex;
    width: 465rpx;
    margin: 0 auto;
    align-items: center;
  }
  &__telephone-wrapper {
    display: flex;
  }
  &__telephone-item {
    width: 52rpx;
    border: 2rpx solid #fca37e;
    height: 72rpx;
    margin-right: 4rpx;
    text-align: center;
  }
  &__telephone_left {
    margin-right: 14rpx;
  }
  &__telephone_right {
    margin-left: 18rpx;
  }
  &__header_img {
    height: 84rpx;
    width: 84rpx;
    margin-right: 21rpx;
    flex-shrink: 0;
  }
  &__header_text {
    line-height: 48rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #333333;
  }
  &__item {
    line-height: 36rpx;
    font-size: 24rpx;
    color: #666666;
    margin-top: 4rpx;
  }
  &__line {
    width: 550rpx;
    height: 1rpx;
    background: #e5e5e5;
    margin-top: 20rpx;
    margin-bottom: 50rpx;
  }
  &__comment {
    text-align: center;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #999999;
    padding: 0 65rpx 0 55rpx;
    margin-top: 30rpx;
  }
}
</style>
