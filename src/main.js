// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
//引入element-ui
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

Vue.use(ElementUI);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
