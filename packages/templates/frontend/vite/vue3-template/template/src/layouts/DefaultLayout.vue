<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  router.replace('/login')
}
</script>

<template>
  <el-container class="layout">
    <el-header class="layout__header">
      <span class="layout__title">{{ $route.meta.title }}</span>
      <div class="layout__user">
        <span>{{ userStore.userInfo?.nickname || userStore.userInfo?.username }}</span>
        <el-button link type="primary" @click="handleLogout">退出登录</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100%;
}
.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--app-header-height);
  border-bottom: 1px solid var(--el-border-color-light);
}
.layout__title {
  font-size: 16px;
  font-weight: 600;
}
.layout__user {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>