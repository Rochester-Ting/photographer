<template>
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
    <div class="mt-4">表单管理</div>
    <VueDraggableNext v-model="PWList" @change="draggableEnd">
      <transition-group>
        <div
          class="PW-aside-item"
          v-for="(item, index) of PWList"
          :key="index"
          :class="item.id === current.id ? 'active' : ''"
          @click="selectedItemClick(item)"
        >
          {{ item.name || '新建表单' + (index + 1) }}
          <n-dropdown
            trigger="click"
            @select="handleSelect"
            :options="options"
            :show-arrow="true"
          >
            <n-icon class="PW-aside-item-icon">
              <EllipsisHorizontalSharp />
            </n-icon>
          </n-dropdown>
        </div>
      </transition-group>
    </VueDraggableNext>

    <n-button class="mt-4 w-56" @click="addNewPWClick">
      <template #icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
      新建表单
    </n-button>
    <ProjectEditModal
      v-if="showModal"
      :showModal="showModal"
      v-model:inputVal="current.name"
      placeholder="请输入新的名字"
      @cancelClick="changePWNameClick('cancel')"
      @confirmClick="changePWNameClick('edit')"
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * name: WholeAside
 * description:
 * author: roct
 * date: 8:25 下午 2021/9/5
 */
import {
  EllipsisHorizontalSharp,
  AddOutline as AddIcon
} from '@vicons/ionicons5'
import { VueDraggableNext } from 'vue-draggable-next'
import ProjectEditModal from '@/Pages/Project/component/ProjectEditModal.vue'
import { onMounted, Ref, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import {
  getPWList,
  updatePWList,
  updateSorted,
  deletePWList
} from '@/api/PWApit'
import { PWType } from '@/api/apiType'
import { generateUUID } from '@/utils/uuid'
import { useMessage, useDialog } from 'naive-ui'
const PWList: Ref<PWType> = ref([])
const emit = defineEmits(['updateSelectedPW'])
const message = useMessage()
const route = useRoute()
const dialog = useDialog()
const showModal = ref(false)
const current: Ref<PWType> = ref({
  id: '',
  name: '',
  projectId: ''
})
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
 * @Description 修改分镜头名称
 * @Date 10:24 下午 2021/9/4
 **/
const changePWNameClick = async (type: string) => {
  showModal.value = false
  if (type === 'edit') {
    await updatePWList(current.value)
  }
  await loadPWList()
}
/**
 * @Author roct
 * @Description 点击创建新的分镜头
 * @Date 7:21 下午 2021/9/4
 **/
const addNewPWClick = async () => {
  const PW = {
    id: generateUUID(),
    projectId: route.query.id + '',
    name: '第' + (PWList.value.length + 1) + '场'
  }
  try {
    await updatePWList(PW)
    message.success('保存成功')
    await loadPWList()
  } catch (e) {
    message.error('保存失败')
  }
}
/**
 * @Author roct
 * @Description 拖拽侧边数据
 * @Date 8:23 下午 2021/9/4
 **/
const draggableEnd = async () => {
  try {
    await updateSorted(PWList.value, route.query.id + '')
    await loadPWList()
  } catch (e) {
    message.error('调整顺序失败')
  }
}
/***
 * @Author roct
 * @Description 点击某个分镜头
 * @Date 9:11 下午 2021/9/3
 **/
const selectedItemClick = (item: PWType) => {
  current.value = item
  emit('updateSelectedPW', item)
}
/**
 * @Author roct
 * @Description 删除某个分镜头
 * @Date 10:21 下午 2021/9/4
 **/
const deletePWRequest = async (item: PWType) => {
  try {
    await deletePWList(item)
    message.success('删除成功')
    await loadPWList()
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
        deletePWRequest(current.value)
      }
    })
  }
}
/***
 * @Author roct
 * @Description 加载分镜头列表
 * @Date 7:41 下午 2021/9/4
 **/
const loadPWList = async () => {
  try {
    PWList.value = await getPWList(route.query.id + '')
    if (PWList.value.length > 0) {
      selectedItemClick(PWList.value[0])
    }
  } catch (e) {
    message.error('获取分镜头列表失败')
  }
}
onMounted(() => {
  loadPWList()
})
</script>
<style scoped lang="scss">
.PW-aside-item {
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
  .PW-aside-item-icon {
    display: none;
  }
  &:hover {
    .PW-aside-item-icon {
      display: block;
    }
  }
  &.active {
    @apply bg-white;
    @apply text-black;
    .PW-aside-item-icon {
      display: block;
    }
  }
}
</style>
