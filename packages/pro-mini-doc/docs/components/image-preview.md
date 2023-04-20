## py-selector 选择器 <to-api/>

<demo-model url="/pages/image-preview"></demo-model>

### 介绍
图片预览

### 使用场景
基本的预览图片需要

### 此页面源代码地址

:::tip Demo源码地址
<br/>
<to-gitlab name="image-preview"/>
<br/>
:::

### 基本使用
```vue
<template>
  <view class="content">
      <image class='imagePreview'
             :src='previewImg'
             @click='preview ' />

      <pm-image-preview :imgSrc='previewImg'
                        :show='previewVisible'
                        @close='closePreview' />
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import previewImg from './image.jpeg'

@Component({})
export default class extends Vue {
  previewVisible = false

  previewImg = previewImg

  onOpen() {
    this.show = true
  }

  onClose() {
    this.show = false
  }

  closePreview() {
    this.previewVisible = false
  }

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

```