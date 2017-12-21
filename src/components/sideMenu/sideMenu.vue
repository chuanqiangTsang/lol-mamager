<template>
    <div id="sideMenu">
        <div class="m-top">
            <div class="logo">
                <img src="../../assets/lol.jpg" />
            </div>
            <h2 class="title">{{ user }}</h2>
            <h2 class="title">{{ welcome }}</h2>
            
            <p class="logout" @click="logout">注销</p>
        </div>
        <div id="menuCon">
            <el-menu mode="vertical">
                
                <el-menu-item index="1">
                    <router-link to="/banner">轮播管理</router-link>
                </el-menu-item>

                 <el-menu-item index="2">
                    <router-link to="/news">新闻管理</router-link>
                </el-menu-item>
                
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
  name: "sideMenu",
  data(){
      return {
          welcome: "欢迎来到英雄联盟",
          user:  localStorage.getItem('lol_username'),
      }
  },
  methods:{
      logout(){
          var _this = this;
        this.$http.post('http://127.0.0.1:3002/dologout',{'username':localStorage.getItem('lol_username')}).then(function(res){
            console.log(res);
            if(res.data.body == '1'){
                localStorage.setItem('lol_isLogin',res.data.isLogout);
                window.location.reload();
            }else{
                _this.$message({
                      type:"error",
                      message:res.data.msg
                  })
            }
        })
      }
  }
}
</script>


<style scoped>
    #sideMenu{
       width: 100%;
       color: white;
    }
    .m-top{
        padding-bottom: 10px;
        border-bottom: 1px solid #393939;
    }

    .title{
        font-size: 16px;
        text-align: center;
        margin-bottom: 10px;
    }

    .logo img{
        width: 100%;
    }
    .logout{
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
    }
    #menuCon{
        padding-top: 25px;
        border-top: 1px solid #000; 
    }
    

    .el-menu{
        background-color: unset;
        border-right: none; 
    }
    .el-menu-item:hover{
        background-color: unset
    }
    .el-menu-item a{
        color: #666;
    }
    .el-menu-item:hover a{
        color: white;
    }
    .sideMenu .router-link-active{
        color: white;
    }
</style>

