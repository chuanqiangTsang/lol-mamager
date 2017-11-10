<template>
  <div id="app">
    
    <login v-if="!isLogin"></login>

    <div v-if="isLogin">
    <!-- 侧边菜单 -->
    <div class="sideMenu">
      <side-menu></side-menu> 
    </div>
    <!-- 内容区域 -->
    <div class="mainPage">
      <router-view> </router-view>
    </div>
  </div>

  </div>

</template>

<script>
import sideMenu from "@/components/sideMenu/sideMenu";
import login from "@/components/login/logIn"
//引进store状态管理
import store from './store';
import {mapState} from 'vuex';
export default {
  name: 'app',
  store,
  data(){
    return {
      isLogin: eval(localStorage.getItem('lol_isLogin')),
    }
  },
  methods:{

  },
  components:{sideMenu,login},

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}

.loginPage{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background:url('./assets/login-bg.jpg') no-repeat center;
  background-size: cover;
  overflow: hidden;
}

.el-form-item__label{
    color: white;
    }
     .el-checkbox__label{
        color: white;
    }

.sideMenu{
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color:  #222;
}

.mainPage{
  margin-left: 250px;
}
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
</style>
