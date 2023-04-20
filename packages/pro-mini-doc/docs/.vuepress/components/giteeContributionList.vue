<template>
  <el-table :data="tableData"
            max-height="550"
            :style="{maxWidth:'630px'}"
            :border="false"
            stripe>
    <el-table-column prop="name"
                     label="姓名"
                     width="180">
    </el-table-column>
    <el-table-column prop="email"
                     label="邮箱"
                     width="350">
    </el-table-column>
    <el-table-column prop="contributions"
                     label="贡献次数"
                     width="100">
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: 'giteeContributionList',
  props: {
    // 仓库所属空间地址(企业、组织或个人的地址path)
    owner: {
      type: String,
      default: 'umicro'
    },
    // 仓库路径(path)
    repo: {
      type: String,
      default: 'uView'
    },
    // 贡献者类型(authors或者committers)
    type: {
      type: String,
      default: 'authors'
    }
  },
  data() {
    return {
      tableData: []
    }
  },
}
</script>

<style lang="scss">
table {
  margin: 0;
}
</style>
