import DefaultTheme from 'vitepress/theme'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 在这里注册全局组件、埋点脚本、自定义指令等
    // app.component('MyGlobalComponent', MyGlobalComponent)
  },
}
