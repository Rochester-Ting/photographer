<template>
  <div
    class="
      h-44
      w-80
      bg-white
      flex
      mb-5
      mr-5
      cursor-pointer
      rounded
      overflow-hidden
    "
  >
    <n-image
      @click="toDetail"
      class="flex-shrink-0"
      width="150"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <div class="flex-auto">
      <div class="p-3 underline flex items-center flex justify-between">
        <span class="truncate w-28" @click="toDetail">{{ props.name }}</span>
        <n-dropdown
          trigger="click"
          @select="handleSelect"
          :options="options"
          :show-arrow="true"
        >
          <n-icon class="ml-3 project-aside-item-icon">
            <EllipsisHorizontalSharp />
          </n-icon>
        </n-dropdown>
      </div>
    </div>
    <ProjectEditModal
      v-if="showModal"
      :showModal="showModal"
      v-model:inputVal="newName"
      placeholder="请输入项目名字"
      @cancelClick="showModal = false"
      @confirmClick="changeGroupNameClick"
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * name: ProjectItem
 * description:
 * author: roct
 * date: 10:28 下午 2021/9/3
 */
import { EllipsisHorizontalSharp } from '@vicons/ionicons5'
import { useMessage, useDialog } from 'naive-ui'
import ProjectEditModal from './ProjectEditModal.vue'
import { deleteProjectList, updateProjectList } from '@/api/projectApi'
import {
  ref,
  defineProps,
  watchEffect,
  reactive,
  defineEmits,
  withDefaults
} from 'vue' // 信息提示
import { useRouter } from 'vue-router'

interface ProjectItemType {
  id: string
  name: string
  parentId: string
}
const props = withDefaults(defineProps<ProjectItemType>(), {
  id: '',
  name: '',
  parentId: ''
})
const router = useRouter()
const newName = ref('')
watchEffect(() => {
  newName.value = props.name
})
const emit = defineEmits(['updateProjectDetail'])
const message = useMessage()
// 获取dialog
const dialog = useDialog()
// 是否显示重命名
const showModal = ref(false)
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
 * @Description 前往项目详情页面
 * @Date 12:18 下午 2021/9/4
 **/
const toDetail = () => {
  router.push({
    name: 'ProjectDetail',
    query: {
      id: props.id,
      parentId: props.parentId
    }
  })
}
/**
 * @Author roct
 * @Description 修改名字
 * @Date 11:26 下午 2021/9/3
 **/
const changeGroupNameClick = async () => {
  showModal.value = false
  const obj = reactive({
    id: '',
    name: ''
  })
  obj.id = props.id
  obj.name = newName.value
  try {
    await updateProjectList(props.parentId, obj)
    emit('updateProjectDetail')
    message.success('修改成功!')
  } catch (e) {
    message.error('修改失败')
  }
}
/**
 * @Author roct
 * @Description 删除
 * @Date 1:15 上午 2021/9/4
 **/
const deleteProjectItemClick = async () => {
  try {
    await deleteProjectList(props.parentId, { id: props.id, name: props.name })
    emit('updateProjectDetail')
    message.success('删除成功!')
  } catch (e) {
    message.error('删除失败')
  }
}
/**
 * @Author roct
 * @Description 点击dropdown
 * @Date 9:24 下午 2021/9/3
 **/
const handleSelect = async (key: string) => {
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
        deleteProjectItemClick()
      }
    })
  }
}
</script>
<style scoped lang="scss"></style>
