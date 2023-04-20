<template>
  <section v-if="visible"
           class="mask"
           :class="{
      'flex-column-all-center': center,
      fuzzy: needFuzzy
    }"
           :style="styleStr"
           @click.stop="onClickMask">
    <section @click.stop>
      <slot></slot>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  /**
   * @description 点击蒙层是否允许关闭
   */
  @Prop({ type: Boolean, default: true }) maskClosable!: boolean

  /**
   * @description 是否纵向居中对齐
   */
  @Prop({ type: Boolean, default: true }) center!: boolean

  @Prop({ type: Boolean, default: false }) needFuzzy?: boolean

  @Prop({ type: Boolean, default: true }) visible!: boolean

  @Prop({ type: Number, default: 0.4 }) opacity?: number

  @Prop({ type: Number, default: 1 }) zIndex?: number

  @Emit('close')
  close() {}

  get styleStr(): string {
    let styleObj: any = {}
    if (typeof this.opacity !== 'undefined') {
      styleObj = {
        background: `rgba(0, 0, 0, ${this.opacity})`,
      }
    }

    if (typeof this.zIndex === 'number') {
      styleObj['z-index'] = this.zIndex
    }

    return styleObjToString(styleObj)
  }

  onClickMask(): void {
    this.close()
  }
}

function styleObjToString(styleObject: any): string {
  return Object.entries<string>(styleObject).reduce(
    (total, cssPropertyKeyValueArr) => {
      return `${total + cssPropertyKeyValueArr.join(':')};`
    },
    ''
  )
}
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
.fuzzy {
  backdrop-filter: blur(5px);
}
.flex-column-all-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
