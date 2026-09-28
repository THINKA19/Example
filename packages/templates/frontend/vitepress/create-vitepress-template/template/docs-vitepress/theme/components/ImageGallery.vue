<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 用法(在任意 Markdown 文件里):
 * <ImageGallery :images="[
 *   { src: '/img/a.jpg', alt: 'A', caption: '第一张' },
 *   { src: '/img/b.jpg', alt: 'B' },
 * ]" />
 *
 * 没有引入任何第三方灯箱库,原因见组件文档:灯箱交互本身不复杂,
 * 自己写一个可以完全掌控无障碍细节(键盘导航、Esc 关闭),
 * 也不用担心第三方库的版本升级或体积问题。
 */
const props = defineProps({
  images: {
    type: Array,
    required: true,
    // 每项: { src, alt?, caption? }
  },
})

// null 表示灯箱关闭,否则是当前查看的图片下标
const activeIndex = ref(null)

function open(index) {
  activeIndex.value = index
}

function close() {
  activeIndex.value = null
}

function prev() {
  if (activeIndex.value === null)
    return
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  if (activeIndex.value === null)
    return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

function onKeydown(event) {
  if (activeIndex.value === null)
    return

  if (event.key === 'Escape')
    close()
  else if (event.key === 'ArrowLeft')
    prev()
  else if (event.key === 'ArrowRight')
    next()
}

// onMounted / onUnmounted 只在客户端执行,VitePress 的 SSR 预渲染阶段
// 根本不会跑到这里,所以直接访问 window 是安全的,不需要额外的
// <ClientOnly> 包裹或 typeof window !== 'undefined' 判断。
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="image-gallery">
    <button
      v-for="(image, index) in images"
      :key="image.src"
      type="button"
      class="image-gallery__item"
      :aria-label="image.alt || `打开第 ${index + 1} 张图片`"
      @click="open(index)"
    >
      <img :src="image.src" :alt="image.alt || ''" loading="lazy">
      <span v-if="image.caption" class="image-gallery__caption">{{ image.caption }}</span>
    </button>
  </div>

  <Teleport v-if="activeIndex !== null" to="body">
    <div
      class="image-lightbox"
      role="dialog"
      aria-modal="true"
      @click.self="close"
    >
      <button type="button" class="image-lightbox__close" aria-label="关闭" @click="close">
        ✕
      </button>

      <button
        v-if="images.length > 1"
        type="button"
        class="image-lightbox__nav image-lightbox__nav--prev"
        aria-label="上一张"
        @click="prev"
      >
        ‹
      </button>

      <img :src="images[activeIndex].src" :alt="images[activeIndex].alt || ''">

      <button
        v-if="images.length > 1"
        type="button"
        class="image-lightbox__nav image-lightbox__nav--next"
        aria-label="下一张"
        @click="next"
      >
        ›
      </button>

      <p v-if="images[activeIndex].caption" class="image-lightbox__caption">
        {{ images[activeIndex].caption }}
      </p>
    </div>
  </Teleport>
</template>
