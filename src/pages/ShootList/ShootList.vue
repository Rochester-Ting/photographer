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
        <n-breadcrumb-item> 分镜头列表 </n-breadcrumb-item>
      </n-breadcrumb>
      <n-space>
        <n-button>打印预览</n-button>
        <n-button>分享</n-button>
      </n-space>
    </div>
    <div class="sl-content flex">
      <SLAside @updateSelectedSL="updateSelectedSL" />
      <SLContent v-if="current.id" :shootId="current.id" :name="current.name" />
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
import { Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SLAside from './components/SLAside.vue'
import SLContent from './components/SLContent.vue'
import { ShootType } from '@/api/apiType'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
// 当前选中的分镜头
const current: Ref<ShootType> = ref({
  id: '',
  name: '',
  projectId: ''
})
/**
 * @Author roct
 * @Description 默认选中侧边栏
 * @Date 8:12 下午 2021/9/4
 **/
const updateSelectedSL = (shoot: ShootType) => {
  current.value = shoot
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
