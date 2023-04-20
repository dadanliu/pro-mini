<template>
  <view class="demo-block">
    <view class="demo-block__title">
      {{title}}
    </view>
    <view class="demo-block__content">
      <slot></slot>
    </view>
  </view>
</template>

<script lang='ts'>
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ type: String }) title!: string
}
</script>

<style lang='scss'>
@mixin center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: #fff;
  width: 200px;
  height: 100px;
  border-radius: 10px;
  @include center;
}

.demo-block {
  &__title {
    margin: 0;
    padding: 20px 16px;
    color: #969799;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
  &__content {
    margin: 0 12px 0;
    padding: 10px 16px;
    overflow: hidden;
    border-radius: 8px;
    background: #fff;
  }
}
</style>
