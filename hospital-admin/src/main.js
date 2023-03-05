import {
  createApp
} from 'vue'
import App from './App.vue'
import {
  autoImportComponent
} from './utils'

// *使用vue-router
import router from './router'
// *使用pinia
import pinia from './store'

// *重置css样式
import 'normalize.css'
import '@/assets/less/index.less'

const app = createApp(App)
app.use(pinia)
app.use(router)

// *按需引入组件库组件
autoImportComponent(app)

app.mount('#app')