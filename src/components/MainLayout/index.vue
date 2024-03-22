<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- 侧边栏容器 -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <div class="title" :class="{ hide: collapsed }">xxx系统</div>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span><RouterLink to="/">一张图</RouterLink> </span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span> <RouterLink to="/404">404</RouterLink> </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 右边内容 -->
    <a-layout>
      <!-- 右边头部 -->
      <a-layout-header class="layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="layout-header-button"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="layout-header-button"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <!-- 右边内容 -->
      <a-layout-content>
        <!-- 定义路由出口 -->
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'

const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
</script>

<style scoped>
@import './index.css';
</style>
