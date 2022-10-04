<template>
  <div>
    <UserSearch @searchByName="searchByName"></UserSearch>
    <br>
    <el-table
      :data="userlist"
      stripe
      border
      style="width: 100%;margin-top: 50px">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="departName"
        label="部门"
        width="180">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="职能组">
      </el-table-column>
      <el-table-column
        prop="dist"
        label="县区">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="详细地址">
      </el-table-column>
      <el-table-column
        prop="phoneNo"
        label="电话">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserSearch from '@/components/menus/UserSearch'
export default {
  name: 'MyUser',
  data () {
    return {
      // 用户列表数据
      userlist: [
      ]
    }
  },
  components: { UserSearch },
  methods: {
    edit (e) {
      this.$router.push('/home/userinfo/' + e.openId)
    },
    async searchByName (name) {
      console.log('MyUser ' + name)
      try {
        const res = await this.$http.post('/questionnaire/NCoV/adminFindByName',
          { userName: name })
        if (res.status !== 200) {
          return
        }
        this.userlist = res.data
      } catch (error) {
        if (error.response.data && error.response.data.errCode === '0001') {
          this.$message.warning('登陆过期，请重新登陆')
          localStorage.removeItem('token')
          await this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
