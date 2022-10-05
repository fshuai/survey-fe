<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
        </div>
        <h2 class="login-title">survey-admin</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button style="width: 45%" type="primary" @click.native.prevent="handleRegister">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length < 3) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      supportDialogVisible: false
    }
  },
  methods: {
    async handleLogin () {
      await this.$refs.loginForm.validate(valid => {
        if (!valid) {
          console.log('参数验证不合法！')
          return false
        }
      })
      let res = null
      try {
        res = await this.$http.post('/questionnaire/login',
          {
            adminUserName: this.loginForm.username,
            adminPassword: this.loginForm.password
          })
        if (res.status === 200 && res.data && res.data.token) {
          localStorage.setItem('token', 'Bearer ' + res.data.token)
          await this.$router.push('/home')
        }
      } catch (error) {
        if (error.response.data && error.response.data.errCode === '2001') {
          localStorage.removeItem('token')
          this.$message.warning('用户名或密码错误')
        }
      }
    },
    handleRegister () {
      this.$message('注册功能暂未开放')
    }
  }
}
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}

.login-title {
  text-align: center;
}

</style>
