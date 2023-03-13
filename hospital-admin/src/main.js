import {
  createApp
} from 'vue'
import App from './App.vue'

import {
  autoImportComponent,
  registerMessageCpn,
  resetRouter
} from './utils'

// *使用vue-router
import router from './router'
// *使用pinia
import pinia from './store'

// *重置css样式
import 'normalize.css'
import '@/assets/less/index.less'
// !引入message样式，解决按需引入不能使用message的bug
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

const app = createApp(App)
app.use(pinia)
app.use(router)

if (localStorage.getItem('token')) {
  resetRouter()
  const route = JSON.parse(localStorage.getItem('currentRoute'))

  const path=route.path
  router.push(path)
}

// *按需引入组件库组件
autoImportComponent(app)
registerMessageCpn(app)

app.mount('#app')
