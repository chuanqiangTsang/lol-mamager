<template>
<div class="loginPage">
  <div class="loninFwrap"> 
      <el-row   type="flex" justify="center"  align="middle" >
         <el-col :span="6"  class="loginTxt">
           <h2>欢迎来到英雄联盟</h2>
         </el-col>
      </el-row type="flex" justify="center"  align="middle" >
        <el-row   type="flex" justify="center"  align="middle" >
        <el-col :span="6" >
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>

          <el-form-item>
             <el-checkbox-group v-model="r_password" >
                <el-checkbox label="七天之内记住密码" name="type"></el-checkbox>
                </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
      </el-form>
      </el-col>
    </el-row>
    </div>
</div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return {
      username: localStorage.getItem('lol_username') || '',
      password: eval(this.getCookie('__lolflag')) ? Base64.decode(Base64.decode(this.getCookie('lol_password'))) : '',
      r_password: eval(this.getCookie('__lolflag')) ? true : false
    }
  },
  methods:{
      login(){
          var _this = this;
          localStorage.setItem('lol_username',this.username);
          this.setCookie('__lolflag',this.r_password,7);
          this.$http.post('http://127.0.0.1:3002/dologin',{'username':this.username,'password':this.password}).then(function(res){
              if(res.data.body == '1'){
                   localStorage.setItem('lol_isLogin',res.data.isLogin);
                    if(_this.r_password){
                       _this.setCookie('lol_password',Base64.encode(Base64.encode(_this.password)),7);
                    }
                   window.location.reload();
              }else{
                  console.log(_this.password)
                  _this.$message({
                      type:"error",
                      message:res.data.msg
                  })
              }
          })
      },
        //设置cookie
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + cvalue + "; " + expires);
                document.cookie = cname + "=" + cvalue + "; " + expires;
                console.info(document.cookie);
            },
            //获取cookie
            getCookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },

             //清除cookie
            clearCookie: function () {
                this.setCookie("username", "", -1);

            },
  }
}
</script>

<style scoped>
    .loninFwrap{
    margin-top: 15%;
    }

    .loginTxt{
    color: white;
    font-size: 18px;
    }

</style>


