<template>
  <div style="margin-top: 50px">
    <el-form ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="员工姓名：">
        <el-input v-model="userInfo.userName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="部门：">
        <el-input v-model="userInfo.departName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="职能组：">
        <el-input v-model="userInfo.groupName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="县区：">
        <el-input v-model="userInfo.dist"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="userInfo.addr"></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="userInfo.phoneNo"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="commit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MyUserDetail',
  props: ['id'],
  created () {
    console.log('on created' + this.id)
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      try {
        const info = await this.$http.post('/questionnaire/NCov/adminFindById', { openId: this.id })
        console.log(info)
        this.userInfo = info.data
      } catch (error) {
        if (error.response.data && error.response.data.errCode === '0001') {
          this.$message('登录失效，请重新登陆')
          await this.$router.push('/login')
        }
      }
    },
    commit () {
      // 1. 判断手机号是否合法
      const phoneReg = /^1[0-9]{10}$/
      if (!phoneReg.test(this.userInfo.phoneNo)) {
        this.$message.warning('手机号输入错误，请检查')
        return
      }
      // 2. 弹出对话框
      this.$confirm('是否确认更新员工信息？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeUserInfo()
      }).catch(() => {})
    },
    async changeUserInfo () {
      try {
        const res = await this.$http.post('/questionnaire/NCoV/adminUpdate',
          {
            userName: this.userInfo.userName,
            openId: this.userInfo.openId,
            departName: this.userInfo.departName,
            groupName: this.userInfo.groupName,
            phoneNo: this.userInfo.phoneNo,
            dist: this.userInfo.dist,
            addr: this.userInfo.addr
          })
        if (res.status === 200) {
          this.$message('更新成功')
        }
        await this.$router.push('/home/')
      } catch (error) {
        if (error.response.data && error.response.data.errCode === '0001') {
          this.$message('登录失效，请重新登陆')
          localStorage.removeItem('token')
          await this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>
