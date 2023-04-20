<template>
  <button
    class="fo-btn my-class"
    :class="otherClass"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import classNames from 'classnames'

/**
 * @description
 * @param {string} [type='default']
 * @param {string} [shape='square']
 * @param {boolean} [disabled=false]
 * @tutorial 可通过'my-class'来修改该组件的样式
 */
@Component({
  // @ts-ignore
  options: {
    virtualHost: true
  } as WechatMiniprogram.Component.OtherOption,
  externalClasses: ['my-class']
})
export default class extends Vue {
  @Prop({ type: String, default: 'default' }) type?:
    | 'primary'
    | 'default'
    | 'link'

  @Prop({ type: String, default: 'square' }) shape?: 'circle' | 'square'

  @Prop({ type: Boolean, default: false }) disabled?: boolean

  get otherClass(): string {
    return classNames(this.type, {
      circle: this.shape === 'circle',
      disabled: this.disabled
    })
  }

  onClick(): void {
    this.$emit('click')
  }
}
</script>

<style scoped lang="scss">
.fo-btn {
  display: inline-block;
  &.disabled {
    opacity: 0.5;
  }
  &.primary {
    height: 88rpx;
    background: #fb7c47;
    border-radius: 8rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    &.circle {
      border-radius: 44rpx;
    }
    // todo: 按钮点击反馈
    // &.button-hover {
    //   background-color: rgba(0, 0, 0, 0.1);
    //   opacity: 0.7;
    // }
  }

  &.link {
    font-size: 28rpx;
    color: #fb7c47;
    padding: 0;
    background-color: transparent;
    line-height: 1.5;
    &::after {
      display: none;
    }
  }
}
</style>
