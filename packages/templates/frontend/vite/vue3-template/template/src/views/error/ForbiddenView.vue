<template>
  <el-result icon="error" title="403" sub-title="没有权限访问该页面">
    <template #extra>
      <el-button type="primary" @click="$router.replace('/')">返回首页</el-button>
    </template>
  </el-result>
</template>