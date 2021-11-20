import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'

// 引入基础样式
import 'normalize.css'
import './assets/css/index.less'
// 全局按需配置element plus
import { registerApp } from './global'

// 全局按需配置axios
const app = createApp(App)

// 方式1
// registerApp(app)
// 方式2 当使用app.use()会自动传入app和调用里面的函数或者install
app.use(registerApp)
app.use(store)
// 防止刷新vuex中的数据被删除了
setupStore()
app.use(router)
app.mount('#app')
