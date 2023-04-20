## picker 选择器 <to-api/>

<demo-model url="/pages/picker"></demo-model>

### 介绍
单选选择器

### 使用场景
基于 v-model 而非将值绑定到数组中的位置 index 的单选选择器

### 此页面源代码地址

:::tip Demo源码地址
<br/>
<to-gitlab name="picker"/>
<br/>
:::

### 基本使用
```vue
<template>
  <view class="content">
    <demo-block title='基础用法'>
      <pm-picker :options='options'
                 v-model='formData.city'
                 placeholder='请选择城市'
                 :clearable='true'>
        <view class='popup-content'>
          自定义 pop-up 内容
        </view>
      </pm-picker>
    </demo-block>
  
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  // pmPopup,
})
export default class extends Vue {
  show = false
  options = [
    { value: '1', label: "成都" },
    { value: '2', label: "北京" },
  ]

  formData = {
    city: null
  }

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
```
## API

## Props

<!-- @vuese:index:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|选择器值|—|`false`|-|
|disabled|是否禁用|`Boolean`|`false`|false|
|clearable|是否可清空|`Boolean`|`false`|false|
|placeholder|placeholder|`String`|`false`|请选择|
|options|options数据|`Array`|`false`|-|

<!-- @vuese:index:props:end -->


## Events

<!-- @vuese:index:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|触发输入钩子|-|

<!-- @vuese:index:events:end -->


## Methods

<!-- @vuese:index:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|clear|清空|-|
|pickerChange|选项变更|-|

<!-- @vuese:index:methods:end -->


