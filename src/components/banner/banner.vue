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
          fileSize: 1024 * 1024
      }
  },

  methods:{
      getbannerLists(){
          var _this = this;
          this.$http.get('http://127.0.0.1:3002/getBanners').then(function(res){
              _this.bannerLists = res.data.bannerLists;
          })
      },
      openDialog(){
          this.dialogTableVisible = true;
      },

      addBannerList(res){
          this.bannerUrl = res.thumb;
      },
      removeBannerList(file){
          this.bannerList = '';
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

              }
            })
      },
      
      deleteBanner(id){
          console.log(id)
      }
  },
  mounted(){
      this.getbannerLists();
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


