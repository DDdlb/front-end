import { defineAsyncComponent } from 'vue'
// export { confirm } from './confirm'
// export { message } from './message'
/**
 * 导出libs下组件，在main.js中使用app.use注册
 */
export default {
  install(app) {
    // 获取当前路径任意文件夹下的 index.vue 文件 
    const components = import.meta.glob('./*/index.vue')
    // 遍历获取到的组件模块
    for (const [key, value] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = 'm-' + key.replace('./', '').split('/')[0]
      // 通过 defineAsyncComponent 异步导入指定路径下的组件，按需加载
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}