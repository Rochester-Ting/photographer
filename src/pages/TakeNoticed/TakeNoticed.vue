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
        <n-breadcrumb-item @click="toGroupList"> 所有项目 </n-breadcrumb-item>
        <n-breadcrumb-item @click="toProjectDetail">
          {{ route.query.name }}
        </n-breadcrumb-item>
        <n-breadcrumb-item> 项目统筹 </n-breadcrumb-item>
      </n-breadcrumb>
      <n-space>
        <n-button>打印预览</n-button>
        <n-button>分享</n-button>
      </n-space>
    </div>
    <div class="sl-content flex">TakeNoticed</div>
  </n-spin>
</template>
<script lang="ts" setup>
/**
 * name: TakeNoticed
 * description:
 * author: roct
 * date: 7:02 下午 2021/9/4
 */
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const loading = ref(false)

const toGroupList = () => {
  router.push({
    name: 'ProjectHome'
  })
}
const toProjectDetail = () => {
  router.go(-1)
}
</script>
<style scoped lang="scss"></style>
