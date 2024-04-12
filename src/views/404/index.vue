<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const clickHandle = () => {
  router.push({
    path: '/'
  })
}
</script>

<template>
  <div className="page">
    <img src="@/assets/images/404.svg" alt="" className="img" />
    <div>
      <h1 className="title“>UH OH！页面丢失"></h1>
      <p className="subtitle">您所访问的页面不存在，您可以点击下方的按钮，返回主页</p>
      <Button ghost type="primary" className="button" @click="clickHandle"> 返回首页 </Button>
    </div>
  </div>
</template>

<style scoped>
.page {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.img {
  display: block;
  width: 70%;
}
.title {
  margin: 0;
  padding: 0;
  color: #999;
  font-size: 32px;
}
.subtitle {
  margin: 10px 0 0;
  padding: 0;
  color: gray;
  font-size: 15px;
  line-height: 1.5;
}
.button {
  margin-top: 20px;
  width: 160px;
  border-radius: 16px;
}
</style>
