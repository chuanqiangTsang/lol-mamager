<template>
  <div id="editNews">
      <h2>添加新闻</h2>

        <el-form class="newsForm" ref="form" label-width="80px">
            <el-form-item class="newsItem" label="标题">
                <el-input type="text" name="desc" v-model="title"></el-input>
            </el-form-item>
        
        <el-form-item class="newsItem" label="上传">
            
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

          <el-form-item class="newsItem" label="作者" name="sort" >
               <el-input type="number" v-model="author" placeholder="数值越大排在越前"></el-input>
          </el-form-item>

          <el-form-item class="newsItem content" label="新闻内容" name="sort" >
            <el-row class="form-row" :gutter="20">
             <quill-editor v-model="content"></quill-editor>
            </el-row>
          </el-form-item>

          <el-button type="primary" @click="newsSubmit">保存</el-button>
        </el-form>


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
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
export default {
  data(){
      return {
          author: '',
          title: '',
          limit: 1,
          deleteDialogVisible: false,
          content: '',
          editor: null,
      }
  },
  components:{quillEditor},
  mounted(){
      this.editor = UE.getEditor('editor',);
  },
  methods:{
      getbannerLists(){
          var _this = this;
          this.$http.get('http://127.0.0.1:3002/getBanners').then(function(res){
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
      newsSubmit(){
          console.log(this.content);
          return ;
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
}
</script>

<style >

    #editNews{
        padding-left: 15px;
    }
    .newsForm{
        margin-top: 20px;
    }

    .newsItem .el-form-item__label{
        color: #797979;
    }
   .editNews .tips{
        color: #a10;
        text-align: left;
        font-size: 12px;
    }
    .small-pic{
        width: 80px;
        height: 80px;
    }
    .newsItem .el-textarea__inner .edui-default{
        border: none;
    }
    .content{
        width: 87%;
        border: none;
    }
    #edui2{
        width: 85%;
    }
</style>


