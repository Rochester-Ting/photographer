<template>
  <n-spin :show="loading">
    <div
      class="
        w-full
        h-16
        border-b border-solid border-gray-100
        flex
        items-center
        px-10
        justify-between
      "
    >
      <n-breadcrumb>
        <n-breadcrumb-item> 所有项目 </n-breadcrumb-item>
        <n-breadcrumb-item> {{ route.query.name }} </n-breadcrumb-item>
        <n-breadcrumb-item> 分镜头列表 </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="sl-content flex">
      <SLAside />
    </div>
  </n-spin>
</template>
<script lang="ts" setup>
/**
 * name: ShootList
 * description:
 * author: roct
 * date: 6:58 下午 2021/9/4
 */
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SLAside from './components/SLAside.vue'
const route = useRoute()
const router = useRouter()
const loading = ref(false)
</script>
<style scoped lang="scss">
.sl-content {
  height: calc(100vh - 64px);
}
</style>
