<template>
  <div id="editNews">
      <h2>添加新闻</h2>

        <el-form class="newsForm" ref="newsForm" v-model="newsForm"  label-width="80px">
            <el-form-item class="newsItem" label="标题" prop="title">
                <el-input type="text" name="title" v-model="title"></el-input>
            </el-form-item>
        
        <el-form-item class="newsItem" label="上传">
            
            <el-upload
                ref="newsUploader"
                name="banner"
                action="http://127.0.0.1:3002/doUploadBanner"
                :on-success="addBannerList"
                :on-remove="removeBannerList"
                :before-upload="chkSize"
                :limit="limit"
                :file-list="newsThumbLists"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
                </el-upload>
                <p class="tips">一次只能上传一张,大小不超过1M</p>
        </el-form-item>

          <el-form-item class="newsItem" label="作者" name="author">
               <el-input type="text" v-model="author"></el-input>
          </el-form-item>

          <el-form-item class="newsItem content" label="新闻内容">
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
            <el-button type="primary" @click="handleDeleteBanner" >确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="newsDialogVisible"
      width="30%"
      center>
      <span>添加成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="backToNewsLists">返回列表</el-button>
        <el-button type="primary" @click="Continue('newsForm')">继续添加</el-button>
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
          newsDialogVisible: false,
          content: '',
          newsThumb: '',
          editor: null,
          newsForm: null,
          newsThumbLists: [],
          newsId: this.$route.query.id || '',
          tipTxt:{
            "title": this.$route.query.id ? '修改成功' : '添加成功',
            "succ": this.$route.query.id ? '' : '添加成功',
          }
          
      }
  },
  components:{quillEditor},

  mounted(){
    this.getOneNew();
  },

  methods:{
    getOneNew(){
      if( this.newsId ){
      // 显示当前新闻的信息
      var _this = this;
      this.$http.get('http://127.0.0.1:3002/getOneNew?id=' + this.newsId).then(function(res){
        var _data = res.data.body[0];
        _this.title = _data.title;
        _this.newsThumbLists = [{"name":"tem.jpg","url": _data.newsThumb}];
        _this.author = _data.author;
        _this.content = _data.content;
        _this.newsThumb = _data.newsThumb;
      });
    }
    },
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
          this.newsThumb = res.thumb;
      },
      removeBannerList(file){
          this.newsThumb = '';
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
          var _this = this;
          if(this.title == ''){
              this.$message({
                  'type': 'error',
                  'message':'请填写标题'
              });
              return ;
          }

          if(this.newsThumb == ''){
              this.$message({
                  'type': 'error',
                  'message':'请上传新闻图片'
              });
              return ;
          }

          if(this.content == ''){
              this.$message({
                  'type': 'error',
                  'message':'新闻内容不能为空'
              });
              return ;
          }

          if(this.$route.query.id){
            this.$http.post('http://127.0.0.1:3002/updateNews',
            {
                "title": this.title,
                "newsThumb": this.newsThumb,
                "author": this.author || "匿名",
                "content": this.content,
                "id": this.$route.query.id || ''
            })
            .then(function(res){
              if(res.data.body == "1"){
                _this.$message({
                  type: 'success',
                  message: res.data.msg
                })
              }
              })
          }else{
            this.$http.post('http://127.0.0.1:3002/doAddNews',
          {
              "title": this.title,
              "newsThumb": this.newsThumb,
              "author": this.author || "匿名",
              "content": this.content
          })
          .then(function(res){
            if(res.data.body == "1"){
              _this.newsDialogVisible = true;
            }
            })
          }     
      },

      backToNewsLists(){
          this.$router.push('/news');
      },
      Continue(formName){
        this.newsDialogVisible = false;
        if( !this.$route.query.id ){
          this.title="";
          this.author="";
          this.content="";
          this.$refs['newsUploader'].clearFiles();
        }else{
          this.getOneNew();
        }
       
      },
      
      deleteBanner(id){
          this.newsThumb = id;
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


