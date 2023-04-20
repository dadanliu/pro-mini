# 快速使用

## 安装

```shell
yarn add @focus/pro-mini-components
```

## uniapp配置easycom组件模式

easycom功能可以让用户无需安装、引用、注册，三个步骤后才能使用组件，详见[easycom文档](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)

easycom的另一个最大的特点是，它是按需引入的，所以您引入了整个组件，即使只用到了button组件，最终打包的时候只会把button打包进去，其他的组件都会被剔除。

```json
// pages.json
{
  "easycom": {
    "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
    "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue",
    "^pm-(.*)": "@focus/pro-mini-components/src/components/pm-$1/index.vue"
  },
}
```

## 如何不使用easycom而单独引用某一个组件

某些情况下，您可能不想通过easycom引用组件(虽然我们极力推荐您使用easycom)，那么您可以使用import这个常规的引入方式，如下：
```vue
<template>
	<pm-button :list="list" v-model="show"></pm-button>
</template>

<script>
	import PmButton from "@focus/pro-mini-components/src/components/pm-button/index.vue";
	export default {
		components: {
			PmButton
		},
		data() {
			return {

			}
		}
	}
</script>

```