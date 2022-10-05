<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="search()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="resetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="搜索姓名：">
            <el-input
              style="width: 203px"
              v-model="searchName"
              placeholder="姓名"
              maxlength="10"
              @keyup.enter.native="search"
              show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserSearch',
  data () {
    return {
      searchName: ''
    }
  },
  methods: {
    resetSearch () {
      this.searchName = ''
    },
    search () {
      this.$emit('searchByName', this.searchName)
    }
  }
}
</script>

<style scoped>
.input-width {
  width: 203px;
}
</style>
