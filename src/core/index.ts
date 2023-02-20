import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'
import { version } from 'v3'
// 多次使用插件模式为 Vue 添加功能
// 装饰器模式
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
// 在rollup的配置中，打包时替换__VERSION__成具体的版本
// 平常的时候也是一样可以将文件名特殊值转成运行时 window.appid 来进行打灰度或者运行时生成访问链接
Vue.version = version

export default Vue
