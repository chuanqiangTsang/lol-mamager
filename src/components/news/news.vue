<template>
  <div id="banner">
      <h2>新闻管理</h2>
      
      <div class="tableBox">
        <el-button type="primary" @click="addNews" class="el-icon-plus">添加</el-button>
        <el-table
        :data="newsLists"
        style="width: 100%">
            <el-table-column
                prop="title"
                align="center"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="newsThumb"
                align="center"
                label="缩略图">
                <template scope="scope">
                    <img class="small-pic" :src="scope.row.newsThumb"/>
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
                    <el-button type="primary" size="small" @click="editNews(scope.row._id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteNews(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    <div class="block" v-if="newsLists.length"> 
        <el-pagination
            layout="prev, pager, next"
            :page-size=pageSize
            :total="pageAmount"
            @current-change="showPage"
            >
        </el-pagination>
    </div>
    
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center>
      <span>确认删除吗？？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCancel">取消</el-button>
        <el-button type="primary" @click="deleteConfirm">确定</el-button>
      </span>
    </el-dialog>

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
          deleteDialogVisible: false,
          newsId: ''
      }
  },

  methods:{
      addNews(){
          this.$router.push('/editNews')
      },
      getNewsLists(){
          var _this = this;
          this.$http.get('http://127.0.0.1:3002/getNewsLists').then(function(res){
              _this.newsLists = res.data.newsLists;
          })
      },
      getNewsCount(){
          var _this = this;
           this.$http.get('http://127.0.0.1:3002/getNewsCount').then(function(res){
            _this.pageAmount = res.data;
        })
      },

      addBannerList(res){
          this.bannerUrl = res.thumb;
      },

      showPage(val){
          var _this = this;
          val = val ? val : 0;
          this.$http.get('http://127.0.0.1:3002/getNewsLists?page='+val).then(function(res){
              _this.newsLists = res.data.newsLists;
          })
      },

      editNews(id){
        this.$router.push('/editNews?id=' + id);
      },

      deleteNews(id){
        this.deleteDialogVisible = true;
        this.newsId = id;
      },

      deleteCancel(){
        this.deleteDialogVisible = false;
      },

      deleteConfirm(){
        this.handleDeleteNews(this.newsId);
        this.deleteDialogVisible = false;
      },


      handleDeleteNews(id){
        var _this = this;
        this.$http.post('http://127.0.0.1:3002/deleteNews',{"id":id}).then(function(res){
          _this.$message({
            type: "success",
            "message": res.data.msg
          });
          _this.getNewsLists();
          _this.getNewsCount();
          })
      },
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


