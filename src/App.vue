<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script setup lang="ts">
import MainLayout from './components/MainLayout/index.vue'
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

/* 整个滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* 滚动条上的滑块 */
::-webkit-scrollbar-thumb {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #ccc;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #e6e6e6;
}
</style>
