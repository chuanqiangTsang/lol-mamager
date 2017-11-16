<template>
  <div id="banner">
      <h2>新闻管理</h2>
      
      <div class="tableBox">
        <el-button type="primary" @click="addNews" class="el-icon-plus">添加</el-button>
        <el-table
        :data="newsLists"
        style="width: 100%">
            <el-table-column
                prop="desc"
                align="center"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="thumb"
                align="center"
                label="缩略图">
                <template scope="scope">
                    <img class="small-pic" :src="scope.row.thumb"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="author"
                align="center"
                label="作者">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                 <template scope="scope">
                    <el-button type="danger" size="small" @click="deleteBanner(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    <div class="block"> 
        <el-pagination
            layout="prev, pager, next"
            :page-size=pageSize
            :total="pageAmount"
            @current-change="showPage"
            >
        </el-pagination>
    </div>
    </div> 
</div>
</template>

<script>
export default {
  data(){
      return {
          newsLists:[],
          title:'',
          sort:'',
          bannerUrl:'',
          page: 1,
          pageSize: 5,
          limit: 1,
          fileSize: 1024 * 1024,
          pageAmount: 5,
      }
  },

  methods:{
      addNews(){
          this.$router.push('/editNews')
      },
      getNewsLists(){
          var _this = this;
          this.$http.get('http://127.0.0.1:3002/getBanners').then(function(res){
              _this.newsLists = res.data.newsLists;
          })
      },
      getNewsCount(){
          var _this = this;
           this.$http.get('http://127.0.0.1:3002/getBannersCount').then(function(res){
            _this.pageAmount = res.data;
        })
      },

      addBannerList(res){
          this.bannerUrl = res.thumb;
      },

      showPage(val){
          var _this = this;
          val = val ? val : 0;
          this.$http.get('http://127.0.0.1:3002/getBanners?page='+val).then(function(res){
              _this.bannerLists = res.data.bannerLists;
          })
      }
  },
  mounted(){
      this.getNewsLists();
      this.getNewsCount();
  },
}
</script>


<style>
    .tableBox{
        margin-top: 25px;
    }
    .tableBox > .el-button{
        float: right;
        margin-right: 15px;
    }
    .bannerDialog .el-form-item__label{
        color: #000;
    }
    .bannerDialog .tips{
        color: #a10;
        text-align: left;
        font-size: 12px;
    }
    .small-pic{
        width: 80px;
        height: 80px;
    }
    
</style>


