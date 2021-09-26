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
        style="background-color: #ffffff"
    >
      <n-breadcrumb>
        <n-breadcrumb-item @click="toProjectList"> 所有项目 </n-breadcrumb-item>
        <n-breadcrumb-item> {{ projectInfo.name }} </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="p-5">
      <DetailHeader
        @save="save"
        :id="projectInfo.id"
        v-model:name="projectInfo.name"
        v-model:desc="projectInfo.desc"
      />
    </div>
    <div class="flex flex-wrap p-5">
      <div
        class="
          w-80
          h-48
          bg-gray-100
          mr-2.5
          mb-2.5
          rounded
          flex flex-col
          items-center
          justify-center
          cursor-pointer
        "
        v-for="(item, index) of operationList"
        :key="index"
        @click="toOperationPages(item)"
      >
        <n-icon size="40" class="mb-5">
          <CameraOutline v-if="item.icon === 'CameraOutline'" />
          <AppsOutline v-if="item.icon === 'AppsOutline'" />
          <FilmSharp v-if="item.icon === 'FilmSharp'" />
          <LibraryOutline v-if="item.icon === 'LibraryOutline'" />
        </n-icon>
        {{ item.title }}
      </div>
    </div>
  </n-spin>
</template>
<script lang="ts" setup>
/**
 * name: ProjectDetail
 * description:
 * author: roct
 * date: 12:14 下午 2021/9/4
 */
import { onMounted, ref, Ref } from 'vue'
import DetailHeader from './components/DetailHeader.vue'
import { getProjectInfo, saveProjectInfo } from '@/api/projectApi'
import { ProjectItemType } from '@/api/apiType'
import { useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  CameraOutline,
  AppsOutline,
  FilmSharp,
  LibraryOutline
} from '@vicons/ionicons5'
import router from '@/router'
const route = useRoute()
// 是否处于正在加载的状态
const loading = ref(false)
// 信息提示
const message = useMessage()
// 初始化当前项目信息
const projectInfo: Ref<ProjectItemType> = ref({
  id: '',
  name: '',
  desc: ''
})
const operationList = ref([
  {
    title: '分镜头列表',
    icon: 'CameraOutline',
    pageName: 'ShootList'
  },
  {
    title: '项目统筹',
    icon: 'AppsOutline',
    pageName: 'ProjectWhole'
  },
  {
    title: '拍摄计划 & 通告',
    icon: 'FilmSharp',
    pageName: 'TakeNoticed'
  },
  {
    title: '媒体库',
    icon: 'LibraryOutline',
    pageName: 'MediaLibrary'
  }
])
/**
 * @Author roct
 * @Description 前往操作页面
 * @Date 7:01 下午 2021/9/4
 **/
const toOperationPages = (item: { pageName: string }) => {
  router.push({
    name: item.pageName,
    query: {
      id: route.query.id,
      name: projectInfo.value.name
    }
  })
}
/***
 * @Author roct
 * @Description 获取项目信息
 * @Date 1:53 下午 2021/9/4
 **/
const loadProjectInfo = async () => {
  loading.value = true
  try {
    projectInfo.value = await getProjectInfo(
      route.query.id + '',
      route.query.parentId + ''
    )
  } catch (e) {
    message.error('获取项目数据失败')
  }
  loading.value = false
}
/**
 * @Author roct
 * @Description 前往项目列表
 * @Date 6:33 下午 2021/9/4
 **/
const toProjectList = () => {
  router.push({
    name: 'ProjectHome'
  })
}
/***
 * @Author roct
 * @Description 保存
 * @Date 2:03 下午 2021/9/4
 **/
const save = async () => {
  loading.value = true
  try {
    await saveProjectInfo(route.query.parentId + '', projectInfo.value)
  } catch (e) {
    message.error('保存失败')
  }
  loading.value = false
}
onMounted(() => {
  loadProjectInfo()
})
</script>
<style scoped lang="scss"></style>
