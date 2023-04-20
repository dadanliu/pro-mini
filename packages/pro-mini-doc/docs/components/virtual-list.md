## virtual-list 虚拟列表 <to-api/>

<demo-model url="/pages/virtual-list"></demo-model>

长列表性能优化的虚拟滚动方案。

### 使用场景

当某个页面需要展示长列表时：比如类似于聊天记录。

支持当触发某个事件时，跳转到指定下标位置；

支持每一项不定高。

### 此页面源代码地址

:::tip Demo源码地址
<br/>
<to-gitlab name="virtual-list"/>
<br/>
:::

### 基本使用

```vue
<template>
  <view :class="pageClass">
		<view class="title">动态高度- {{ mockDataLen }}条数据</view>

    <pm-virtual-list
      ref="virtualList"
      v-model="visibleList"
      height="calc(100vh - 100px - 80rpx)"
      item-height="70"
      :list="list"
      :dynamic="true"
      @scrolltoupper="onScrolltoupper"
      @scrolltolower="onScrolltolower"
    >
      <!-- header slot -->
      <template #header>
        <view v-if="loadingStatus.upper">上拉刷新中...</view>
      </template>

      <!-- default slot -->
      <template>
        <view
          v-for="item in visibleList"
          :key="item.id"
          :id="'item-virtual-' + item._virtualId"
          :class="itemClass"
          :style="item._virtualStyle"
          @click="onClickItem(list, String(item._virtualId))"
        >
          <view class="content" :style="{ backgroundColor: item.bg }">
            <view v-for="n in item.random" :key="n">{{ item.title }}</view>
          </view>
        </view>
      </template>

      <!-- footer slot -->
      <template #footer>
        <view v-if="loadingStatus.lower">下拉加载中...</view>
      </template>
    </pm-virtual-list>
    <view class="skip" @click="handleSkip">点击跳转至60</view>
  </view>
</template>

<script>
import { random } from './utils'

export default {
  name: 'PageDynamic',

  components: {
    // VirtualList
  },

  data() {
    return {
      pageClass: 'page-dynamic',
      itemClass: 'item-virtual',
			mockDataLen: 3000,
      list: [],
      visibleList: [],
      resetCount: 0,
      loadingStatus: {
        upper: false,
        lower: false
      }
    }
  },

  created() {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
    setTimeout(() => {
      this._mockListData()
			uni.hideLoading()
    }, 1500)
  },

  mounted() {
    this.$refs.virtualList.initialization({
      pageContext: this,
      containerSelector: '.' + this.pageClass,
      itemSelector: '.' + this.itemClass
    })
  },

  methods: {
    /**
     * 点击 item 事件
     * @param {Object[]} list 数据列表
     * @param {number} index 当前的数据索引
     */
    onClickItem(list, index) {
      const item = list[index]
      const { title } = item
      const titleList = title.split('-')

      titleList[3] || (titleList[3] = 0)
      titleList[3]++

      item.title = titleList.join('-')
    },

    /**
     * 监听 滚动到顶部，重置并加载新数据
     */
    onScrolltoupper() {
      if (this.loadingStatus.upper) return

      console.log('--- onScrolltoupper start ---')
      this.loadingStatus.upper = true

      setTimeout(() => {
        this.list = []
        this.resetCount++
        this._mockListData()
        this.$refs.virtualList.resetCache()
        this.loadingStatus.upper = false

        console.log('--- onScrolltoupper end ---')
      }, 2000)
    },

    /**
     * 监听 滚动到底部，加载数据
     */
    onScrolltolower() {
      if (this.loadingStatus.lower) return

      console.log('--- onScrolltolower start ---')
      this.loadingStatus.lower = true

      setTimeout(() => {
        this._mockListData()
        this.loadingStatus.lower = false

        console.log('--- onScrolltolower end ---')
      }, 2000)
    },
    /**
     * 模拟 list 数据
     */
    _mockListData() {
      const tempList = []

      for (let i = 0; i < this.mockDataLen; i++) {
        const n = i + this.list.length

        tempList.push({
          _virtualId: n,
          title: '可点击递增：list-' + this.resetCount + '-' + Number(n + 1),
          random: Array(random(1, 3)),
          bg: this._getRandomBgColor()
        })
      }

      this.list = [].concat(this.list, tempList)
    },

    /**
     * 获取 随机糖果色
     * 通过闭包来处理私有变量
     */
    _getRandomBgColor: (() => {
      let index = 0

      return function () {
        const colorList = [
          'rgba(65, 176, 126, 1)',
          'rgba(65, 176, 126, 0.8)',
          'rgba(65, 176, 126, 0.6)',
          'rgba(65, 176, 126, 0.4)',
          'rgba(65, 176, 126, 0.2)'
        ]

        const val = colorList[index]
        ++index === colorList.length && (index = 0)

        return val
      }
    })(),

    handleSkip() {
      // 模拟跳转
      const targetIndex = 60
      this.$refs.virtualList.changeVisibleList(targetIndex)
    }
  }
}
</script>
```

## API

## Props

<!-- @vuese:index:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|list|list数据|`Array`|`false`|[]|
|value|v-model值 当前可视区域内能渲染的 list|`Array`|`false`|[]|
|bufferScale|数据预加载比例|`Number`|`false`|1|
|itemHeight|item预估height值|`Number` /  `String`|`false`|100|
|dynamic|item中的height是否是动态的|`Boolean`|`false`|false|
|gap|每一项之间的间距|`Number`|`false`|12|
|height|scroll-view 容器 height 值|`Number` /  `String`|`false`|300|

<!-- @vuese:index:props:end -->


## Events

<!-- @vuese:index:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|更新 v-model 数据|-|
|scrolltoupper|scroll-view滚动到顶部, 派发事件|-|
|scrolltolower|scroll-view滚动到底部, 派发事件|-|

<!-- @vuese:index:events:end -->


## Slots

<!-- @vuese:index:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|header|header|-|
|default|列表内容|-|
|footer|footer|-|

<!-- @vuese:index:slots:end -->


## Methods

<!-- @vuese:index:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|initialization|提供给父组件调用并初始化数据|-|
|changeVisibleList|提供给父组件调用并改变可视区域列表个数|-|

<!-- @vuese:index:methods:end -->


