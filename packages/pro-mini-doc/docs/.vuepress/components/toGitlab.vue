<template>
	<a 
		:href="href" 
		target="_blank" 
		style="display: flex;align-items: center"
	>
		<img height="30" src="/pro-mini/common/gitlab-logo.svg" title="Gitlab" width="30"/>&nbsp;Gitlab
	</a>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: 'api'
			}
		},
		computed: {
			href() {
				return `http://code.ops.focus.cn/fe-base/pro-mini/blob/master/packages/pro-mini-demos/src/pages/${this.name}/index.vue`
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
