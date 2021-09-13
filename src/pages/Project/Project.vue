<template>
  <n-spin :show="loading">
    <ProjectHeader
      :projectGroupList="projectGroupList"
      @createNewProjectClick="createNewProjectClick"
    />
    <div class="project-content flex">
      <div
        class="
          flex flex-col
          items-center
          w-60
          bg-gray-100
          overflow-auto
          flex-shrink-0
        "
      >
        <div class="mt-4">项目组管理</div>
        <VueDraggableNext v-model="projectGroupList" @change="draggableEnd">
          <transition-group>
            <div
              class="project-aside-item"
              v-for="(item, index) of projectGroupList"
              :key="index"
              :class="item.id === current.id ? 'active' : ''"
              @click="selectedItemClick(item)"
            >
              {{ item.name || '新建项目组' + (index + 1) }}
              <n-dropdown
                trigger="click"
                @select="(key) => handleSelect(key, item)"
                :options="options"
                :show-arrow="true"
              >
                <n-icon class="project-aside-item-icon">
                  <EllipsisHorizontalSharp />
                </n-icon>
              </n-dropdown>
            </div>
          </transition-group>
        </VueDraggableNext>
        <n-button class="mt-4 w-56" @click="addNewProjectGroupClick">
          <template #icon>
            <n-icon>
              <add-icon />
            </n-icon>
          </template>
          新建项目组
        </n-button>
      </div>
      <div
        class="
          flex-auto
          h-auto
          p-5
          flex flex-wrap
          overflow-auto
          bg-gray-200
          pl-10
          content-start
        "
      >
        <ProjectItem
          v-for="(item, index) of projectList"
          :key="index"
          :parentId="current.id"
          :id="item.id"
          :name="item.name"
          @updateProjectDetail="loadProjectDetail"
        />
      </div>
    </div>
    <ProjectEditModal
      v-if="showModal"
      :showModal="showModal"
      v-model:inputVal="editGroup.name"
      placeholder="请输入新的名字"
      @cancelClick="changeGroupNameClick('cancel')"
      @confirmClick="changeGroupNameClick('edit')"
    />
    <ProjectEditModal
      v-if="showCreateProjectModal"
      :showModal="showCreateProjectModal"
      v-model:inputVal="newProject.name"
      placeholder="请输入项目名字"
      @cancelClick="hiddenCreateProject"
      @confirmClick="newProjectClick"
    />
  </n-spin>
</template>
<script lang="ts" setup>
/**
 * name: Project
 * description:
 * author: roct
 * date: 9:49 下午 2021/8/31
 */

import { Ref, ref, onMounted } from 'vue'
import {
  AddOutline as AddIcon,
  EllipsisHorizontalSharp
} from '@vicons/ionicons5'
import { VueDraggableNext } from 'vue-draggable-next'
import {
  getAllProjectGroup,
  saveAllProjectGroup,
  deleteProjectGroup,
  updateProjectGroup
} from '@/api/api'
import { getProjectList, saveProjectList } from '@/api/projectApi'
import { ProjectItemGroupType, ProjectItemType } from '@/api/apiType'
import { useMessage, useDialog } from 'naive-ui'
import ProjectItem from './component/ProjectItem.vue'
import ProjectEditModal from './component/ProjectEditModal.vue'
import { generateUUID } from '@/utils/uuid'
import ProjectHeader from './component/ProjectHeader.vue'
import { updateSorted } from '@/api/PWApit'
// 信息提示
const message = useMessage()
// 获取dialog
const dialog = useDialog()
// 是否显示重命名
const showModal = ref(false)
// 创建新项目是否显示弹窗
const showCreateProjectModal = ref(false)
// 项目组列表
const projectGroupList: Ref<ProjectItemGroupType[]> = ref([])
// 项目列表
const projectList: Ref<ProjectItemType[]> = ref([])
// 当前选中的项目组
const current: Ref<ProjectItemGroupType> = ref({
  id: '',
  name: ''
})
// 要创建的项目
const newProject: Ref<ProjectItemType> = ref({
  id: '',
  name: ''
})
// 当前要操作的项目组
const editGroup: Ref<ProjectItemGroupType> = ref({
  id: '',
  name: ''
})
// loading
const loading = ref(false)
// dropdown的item内容
const options = [
  {
    label: '重命名',
    key: 'edit'
  },
  {
    label: '删除',
    key: 'delete'
  }
]
/**
 * @Author roct
 * @Description 隐藏创建项目的modal
 * @Date 12:49 下午 2021/9/4
 **/
const hiddenCreateProject = () => {
  console.log('?????')
  showCreateProjectModal.value = false
}
/**
 * @Author roct
 * @Description 拖拽侧边数据
 * @Date 8:23 下午 2021/9/4
 **/
const draggableEnd = async () => {
  try {
    await saveAllProjectGroup(projectGroupList.value)
  } catch (e) {
    message.error('调整顺序失败')
  }
}
/**
 * @Author roct
 * @Description 创建新项目点击确定
 * @Date 12:11 上午 2021/9/4
 **/
const newProjectClick = async () => {
  hiddenCreateProject()
  newProject.value.id = generateUUID()
  projectList.value.push(newProject.value)
  console.log('projectList.value', projectList.value)
  await saveProjectList(current.value.id, projectList.value)
  newProject.value = {
    id: '',
    name: ''
  }
  await loadProjectDetail()
}

/***
 * @Author roct
 * @Description 点击创建新项目
 * @Date 12:07 上午 2021/9/4
 **/
const createNewProjectClick = () => {
  showCreateProjectModal.value = true
}
/***
 * @Author roct
 * @Description 点击某个项目组
 * @Date 9:11 下午 2021/9/3
 **/
const selectedItemClick = (item: ProjectItemGroupType) => {
  current.value = item
  loadProjectDetail()
}
/**
 * @Author roct
 * @Description 点击新建项目组
 * @Date 9:13 下午 2021/9/3
 **/
const addNewProjectGroupClick = async () => {
  const item = {
    id: generateUUID(),
    name:
      '新建项目组' +
      (projectGroupList.value.length + 1) +
      '(' +
      generateUUID().substr(Math.floor(Math.random() * 10 + 1), 2) +
      ')'
  }
  projectGroupList.value.push(item)
  await saveAllProjectGroup(projectGroupList.value)
  current.value = item
}
/**
 * @Author roct
 * @Description 点击dropdown
 * @Date 9:24 下午 2021/9/3
 **/
const handleSelect = async (key: string, item: ProjectItemGroupType) => {
  editGroup.value = item
  if (key === 'edit') {
    showModal.value = true
  }
  if (key === 'delete') {
    dialog.error({
      title: '提示',
      content: '是否删除?',
      positiveText: '确定',
      showIcon: false,
      negativeText: '取消',
      onPositiveClick: () => {
        deleteProjectGroupClick(item)
      }
    })
  }
}
/**
 * @Author roct
 * @Description 删除项目组
 * @Date 9:54 下午 2021/9/3
 **/
const deleteProjectGroupClick = async (item: ProjectItemGroupType) => {
  try {
    await deleteProjectGroup(item)
    message.success('删除成功')
    await loadProjectGroup()
  } catch (e) {
    message.error('删除失败')
  }
}
/**
 * @Author roct
 * @Description 点击更新名字
 * @Date 10:11 下午 2021/9/3
 **/
const changeGroupNameClick = async (type: string) => {
  try {
    showModal.value = false
    if (type === 'edit') {
      await updateProjectGroup(editGroup.value)
      message.success('修改成功')
    }
    await loadProjectGroup()
  } catch (e) {
    message.error('修改失败')
  }
}
/**
 * @Author roct
 * @Description 获取当前选中的项目组的详细信息
 * @Date 12:02 上午 2021/9/4
 **/
const loadProjectDetail = async () => {
  projectList.value = await getProjectList(current.value.id)
  console.log('current.value.id', current.value.id, projectList.value)
}
/**
 * @Author roct
 * @Description 加载项目列表
 * @Date 9:38 下午 2021/9/3
 **/
const loadProjectGroup = () => {
  loading.value = true
  setTimeout(async () => {
    projectGroupList.value = await getAllProjectGroup()
    if (projectGroupList.value.length > 0) {
      current.value = projectGroupList.value[0]
      await loadProjectDetail()
    }
    loading.value = false
  }, 1000)
}

onMounted(() => {
  loadProjectGroup()
})
</script>
<style scoped lang="scss">
.project-content {
  height: calc(100vh - 64px);
  .project-aside-item {
    @apply flex;
    @apply items-center;
    @apply justify-between;
    @apply px-5;
    @apply h-10;
    @apply leading-10;
    @apply cursor-pointer;
    @apply hover:bg-white;
    @apply hover:text-black;
    @apply mt-3;
    @apply text-gray-500;
    @apply w-56;
    .project-aside-item-icon {
      display: none;
    }
    &:hover {
      .project-aside-item-icon {
        display: block;
      }
    }
    &.active {
      @apply bg-white;
      @apply text-black;
      .project-aside-item-icon {
        display: block;
      }
    }
  }
}
</style>
