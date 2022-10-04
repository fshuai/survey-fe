<template>
  <div>
    <div style="height: 50px">
      <img class="layout-header-left-img" src="../../assets/logo.png" alt="">
      <el-dropdown class="avatar-container">
        <div>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown></div>
    </div>
</template>

<script>
export default {
  name: 'MyHeader',
  methods: {
    logout () {
      console.log('exit')
      //  1.清空 token
      localStorage.removeItem('token')
      //  2.跳转到 登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}

.layout-header-left-img {
  height: 50px;
  display: inline-block;
}

.avatar-container {
  height: 40px;
  display: inline-block;
  position: absolute;
  right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
