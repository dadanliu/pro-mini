<template>
  <view class="content">
    <demo-block title='基础用法'>
      <pm-button @click='takeSot'>上传照片</pm-button>
      <pm-watermark ref="takeShot"
                    :show="isTakeShot"
                    @success="uploadSuccess"
                    bdKey='txCv8MxbcrS5MwZUXfDGzk9tNumHF4nI'
                    @close="isTakeShot = false"
                    :isUpdateShot="false" />
    </demo-block>
  </view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  isTakeShot = false

  takeSot() {
    this.isTakeShot = true
  }

  uploadSuccess() {
    console.log('uploadSuccess')
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
