<template>
  <div id="banner">
      <h2>轮播图设置</h2>
      
      <div class="tableBox">
        <el-button type="primary" @click="openDialog" class="el-icon-plus">添加</el-button>
        <el-table
        :data="bannerLists"
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
    <el-dialog title="添加轮播图" :visible.sync="dialogTableVisible" width="60%" class="bannerDialog">
        <el-form ref="form" >
            <el-form-item label="描述">
                <el-input type="textarea" name="desc" v-model="desc"></el-input>
            </el-form-item>
        
        <el-form-item label="上传">
            
            <el-upload
                name="banner"
                action="http://127.0.0.1:3002/doUploadBanner"
                :on-success="addBannerList"
                :on-remove="removeBannerList"
                :before-upload="chkSize"
                :limit="limit"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
                </el-upload>
                <p class="tips">一次只能上传一张,大小不超过1M</p>
        </el-form-item>

          <el-form-item label="排序" name="sort" >
               <el-input type="number" v-model="sort" placeholder="数值越大排在越前"></el-input>
          </el-form-item>
          <el-button type="primary" @click="bannerSubmit">保存</el-button>
        </el-form>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%"
       >
        <span>确认删除吗</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleDeleteBanner">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>


<script>
export default {
  data(){
      return {
          dialogTableVisible: false,
          bannerLists:[],
          desc:'',
          sort:'',
          bannerUrl:'',
          page: 1,
          pageSize: 5,
          limit: 1,
          fileSize: 1024 * 1024,
          pageAmount: 5,
          deleteDialogVisible: false,
          bannerId: '',
      }
  },

  methods:{
      getbannerLists(){
          var _this = this;
          this.$http.get('http://127.0.0.1:3002/getBanners').then(function(res){
              //console.log(res);
              _this.bannerLists = res.data.bannerLists;
          })
      },
      getbannerCount(){
          var _this = this;
           this.$http.get('http://127.0.0.1:3002/getBannersCount').then(function(res){
            _this.pageAmount = res.data;
        })
      },
      openDialog(){
          this.dialogTableVisible = true;
      },

      addBannerList(res){
          this.bannerUrl = res.thumb;
      },
      removeBannerList(file){
          this.bannerUrl = '';
      },
      chkSize(file){
          if(file.size > this.fileSize){
              this.$message({
                  'type':"error",
                  'message': "文件太大，无法上传"
              });
              return false;
          }
      },
      bannerSubmit(){
          var _this = this;
          if(this.desc == ''){
              this.$message({
                  'type': 'error',
                  'message':'请填写描述'
              });
              return ;
          }

          if(this.bannerUrl == ''){
              this.$message({
                  'type': 'error',
                  'message':'轮播图不能为空'
              });
              return ;
          }
          this.$http.post('http://127.0.0.1:3002/doAddBanner',
          {
              "desc": this.desc,
              "sort": this.sort,
              "thumb": this.bannerUrl
          })
          .then(function(res){
              if(res.data.body == "1"){
                  _this.dialogTableVisible = false;
                  window.location.reload();
              }
            })
      },
      
      deleteBanner(id){
          this.deleteDialogVisible = true;
          this.bannerId = id;
      },
      handleDeleteBanner(){
          var _this = this;
          this.$http.post('http://127.0.0.1:3002/deleteBanner',{"id":this.bannerId}).then(function(res){
            if(res.data.body == "1"){
                _this.deleteDialogVisible = false;
                window.location.reload();
            }
          })
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
      this.getbannerLists();
      this.getbannerCount();
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


