## py-selector 选择器 <to-api/>

<demo-model url="/pages/py-selector"></demo-model>

### 介绍

基于拼音首字母排序的多选选择器

### 使用场景
支持模糊搜索，支持多选，支持拼音首字母排序

### 此页面源代码地址

:::tip Demo源码地址
<br/>
<to-gitlab name="py-selector"/>
<br/>
:::

### 基本使用
```vue
<template>
  <view class="content">
    <demo-block title='基础用法'>
      <pm-py-selector ref='selectStore'
                      v-model='storeIdList'
                      :options="storeList" />
    </demo-block>
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  storeIdList = []

  storeList = [
    { label: 'aconanme1', value: 0 },
    { label: 'econanme1', value: 10 },
    { label: 'iconanme1', value: 1 },
    { label: 'iconanme2', value: 2 },
    { label: 'iconanme3', value: 3 },
    { label: 'iconanme4', value: 4 },
    { label: 'iconanme5', value: 5 },
    { label: 'iconanme6', value: 6 }
  ]

  onUnload() {
    this.$refs.selectStore && this.$refs.vSelectBottom.hide()
  }
}
</script>

<style lang='scss'>
</style>

```

## API

## Props

<!-- @vuese:index:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|选择器值|`Array`|`false`|-|
|disabled|是否禁用|`Boolean`|`false`|false|
|clearable|是否可清空|`Boolean`|`false`|false|
|placeholder|占位符|`String`|`false`|请选择|
|options|options 数据|`Array`|`false`|-|

<!-- @vuese:index:props:end -->


## Events

<!-- @vuese:index:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|select|获取value的改变|-|
|input|触发onInput|-|

<!-- @vuese:index:events:end -->


## Methods

<!-- @vuese:index:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|selectSearchResult|选择搜索结果|-|
|open|打开面板|-|
|handleInput|触发onInput|-|
|close|关闭面板|-|
|back|关闭面板|-|
|confirm|确认选择|-|
|messageInfo|空值提示|-|
|clear|清空|-|
|showPopup|空值提示|-|

<!-- @vuese:index:methods:end -->


## MixIns

<!-- @vuese:index:mixIns:start -->
|MixIn|
|---|
|pinyin|

<!-- @vuese:index:mixIns:end -->


