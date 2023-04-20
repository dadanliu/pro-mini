<template>
  <view class="picker-wrapper">
    <picker range-key="label"
            :range="options"
            :disabled="selectDisabled"
            :class="[colorDisplay, 'pickerMinWidth', disabledClass]"
            :value="valueIdx"
            :placeholder-style="placeholderStyle"
            @change="pickerChange">
      {{ selectedLabel || placeholder }}
    </picker>
    <u-icon v-if="clearDisplay"
            name="close"
            color="#bbb"
            class="clear-btn"
            :size="24"
            @click.stop="clear" />
    <i v-else
       class="icon2018 e912 right-arrow" />
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  /**
   * 选择器值
   */
  @Prop({ type: String || Number }) readonly value!: string

  /**
   * 是否禁用
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  /**
   * 是否可清空
   */
  @Prop({ type: Boolean, default: false }) readonly clearable!: boolean

  /**
   * placeholder
   */
  @Prop({ type: String, default: '请选择' }) readonly placeholder?: string

  /**
   * options数据
   */
  @Prop({ type: Array }) options!: Array<{ value: any; label: any }>

  /**
   * placeholder样式
   */
  placeholderStyle =
    'color:#bbbbbb;font-size:28rpx;line-height:40rpx;text-align:right;'

  /**
   * 选择器label值
   */
  selectedLabel = this.placeholder

  /**
   * 选择数组中的位置
   */
  valueIdx: number | null = 0

  /**
   * 是否禁用
   */
  get selectDisabled() {
    return this.disabled || !this.options || !this.options.length
  }

  /**
   * 是否禁用样式
   */
  get disabledClass() {
    return this.selectDisabled ? 'disabled' : ''
  }

  /**
   * 是否禁用样式颜色
   */
  get colorDisplay() {
    const className =
      !this.selectedLabel ||
      this.selectedLabel === this.placeholder ||
      this.selectedLabel === '请选择'
        ? 'unSelected'
        : 'selected'

    return className
  }

  /**
   * 依赖
   */
  get dependencies() {
    return {
      value: this.value,
      options: this.options,
    }
  }

  /**
   * 清空样式
   */
  get clearDisplay() {
    if (this.clearable) {
      return (
        !this.disabled &&
        this.selectedLabel !== this.placeholder &&
        this.selectedLabel
      )
    }
    return false
  }

  /**
   * 触发输入钩子
   */
  @Emit('input')
  changeInput(value) {
    return value
  }

  /**
   * 依赖变更
   */
  @Watch('dependencies', { immediate: true, deep: true })
  onDependenciesChange({ value }) {
    if (this.options.length) {
      let selected
      const idx = this.options.findIndex((v) => {
        return v.value == value
      })!

      if (idx === -1) {
        this.valueIdx = 0
      } else {
        this.valueIdx = idx
        selected = this.options[idx]
      }

      this.selectedLabel = selected?.label || null
      this.changeInput(selected?.value)
    } else {
      this.valueIdx = 0
      this.selectedLabel = this.placeholder
    }
  }

  /**
   * @vuese
   * 清空
   */
  clear() {
    if (!this.disabled) {
      this.valueIdx = 0
      this.changeInput(null)
      Vue.$nextTick(() => {
        this.selectedLabel = this.placeholder
      })
    }
  }

  /**
   * @vuese
   * 选项变更
   */
  pickerChange(e) {
    const idx = e.target.value
    const value = this.options[idx]?.value
    this.changeInput(value)
  }
}
</script>

<style scoped lang="scss">
.clear-btn {
  padding-left: 8px;
}
.unSelected {
  color: #bbb;
  font-size: 28rpx;
  line-height: 32rpx;
}
.selected {
  color: #666;
}
.disabled {
  color: #989898 !important;
}
.pickerMinWidth {
  min-width: 150px;
  text-align: right;
}
.picker-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .right-arrow {
    font-size: 36rpx;
    color: #bbbbbb;
    line-height: 36rpx;
    margin-left: 10rpx;
  }
}
</style>
