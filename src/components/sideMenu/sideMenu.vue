<template>
    <div id="sideMenu">
        <div class="logo">
            <img src="../../assets/lol.jpg" />
        </div>
        <h2 class="title">{{ user }}</h2>
        <h2 class="title">{{ welcome }}</h2>
        
        <p class="logout" @click="logout">注销</p>
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
    .title{
        font-size: 16px;
        text-align: center;
    }

    .logo img{
        width: 100%;
    }
    .logout{
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
    }
</style>

