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
    <div class="sl-content flex">
      <WholeAside @updateSelectedPW="updateSelectedPW" />
      <WholeContent :PWId="current.id" :name="current.name" />
    </div>
  </n-spin>
</template>
<script lang="ts" setup>
/**
 * name: ProjectWhole
 * description:
 * author: roct
 * date: 7:02 下午 2021/9/4
 */
import { Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WholeAside from './components/WholeAside.vue'
import WholeContent from './components/WholeContent.vue'
import { PWType } from '@/api/apiType'
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const current: Ref<PWType> = ref({
  id: '',
  name: '',
  PWId: ''
})
const updateSelectedPW = (item: PWType) => {
  current.value = item
}
const toGroupList = () => {
  router.push({
    name: 'ProjectHome'
  })
}
const toProjectDetail = () => {
  router.go(-1)
}
</script>
<style scoped lang="scss">
.sl-content {
  height: calc(100vh - 64px);
}
</style>
