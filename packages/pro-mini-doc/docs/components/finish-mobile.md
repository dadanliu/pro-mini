## finish-mobile 手机补全 <to-api/>

<demo-model url="/pages/finish-mobile"></demo-model>

### 介绍
手机号补全

### 使用场景
完善中间四位手机号

### 此页面源代码地址

:::tip Demo源码地址
<br/>
<to-gitlab name="finish-mobile"/>
<br/>
:::

### 基本使用
```vue
<template>
  <view class="content">
      <pm-button @click="onOpen">complete mobile</pm-button>
      <pm-finish-mobile :phoneLeft='phoneLeft'
                           :phoneRight='phoneRight'
                           :show="isFinishMobilePopupShow"
                           @confirmComplete='confirmComplete'
                           @close="isFinishMobilePopupShow = false"
                           @afterFinishMobile="afterFinsihMobile" />
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  isFinishMobilePopupShow = false

  phoneLeft = '133'

  phoneRight = '2255'

  confirmComplete(partialPhone) {
    console.log('confirmComplete', partialPhone)
  }

  afterFinsihMobile() {
    this.onClose()
  }

  onOpen() {
    this.isFinishMobilePopupShow = true
  }

  onClose() {
    this.isFinishMobilePopupShow = false
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
```

## API
## Props

<!-- @vuese:index:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|标题|`String`|`false`|-|
|phoneLeft|手机号前四位|`String`|`false`|-|
|phoneRight|手机号后四位|`String`|`false`|-|
|show|开关弹窗|`Boolean`|`false`|false|

<!-- @vuese:index:props:end -->


## Events

<!-- @vuese:index:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close|关闭时调用|-|
|confirmComplete|补全的手机号内容|-|

<!-- @vuese:index:events:end -->


## Slots

<!-- @vuese:index:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:index:slots:end -->


## Methods

<!-- @vuese:index:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|submit|提交|-|

<!-- @vuese:index:methods:end -->


