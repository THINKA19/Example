<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const count = ref(0)

function handleClick() {
  count.value++
  ElMessage.success(`Element Plus 已生效，点击了 ${count.value} 次`)
}
</script>

<template>
  <div>
    <h2>欢迎，{{ userStore.userInfo?.nickname || userStore.userInfo?.username }}</h2>
    <el-button type="primary" @click="handleClick">验证 Element Plus</el-button>
  </div>
</template>