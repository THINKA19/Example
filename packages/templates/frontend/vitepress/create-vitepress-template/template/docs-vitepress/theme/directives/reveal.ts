/**
 * v-reveal:元素进入视口时加上 is-visible class,
 * 触发 theme/style.css 里 [data-reveal].is-visible 的淡入动画。
 *
 * 用浏览器原生 IntersectionObserver,不引入额外动画库。
 * Vue 自定义指令的 mounted / unmounted 钩子只在客户端执行,
 * VitePress 的 SSR 预渲染阶段不会调用它们,所以这里直接访问
 * window/IntersectionObserver 是安全的,不需要额外的环境判断。
 */
export const reveal = {
  mounted(el) {
    el.setAttribute('data-reveal', '')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    el.__revealObserver__ = observer
  },
  unmounted(el) {
    el.__revealObserver__?.disconnect()
  },
}
