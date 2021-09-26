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
        style="background-color: #d3e0ea"
  >
    <div class="mt-4">分镜头列表</div>
    <VueDraggableNext v-model="slList" @change="draggableEnd">
      <transition-group>
        <div
          class="sl-aside-item"
          v-for="(item, index) of slList"
          :key="index"
          :class="item.id === current.id ? 'active' : ''"
          @click="selectedItemClick(item)"
        >
          {{ item.name || '新建分镜头' + (index + 1) }}
          <n-dropdown
            trigger="click"
            @select="handleSelect"
            :options="options"
            :show-arrow="true"
          >
            <n-icon class="sl-aside-item-icon">
              <EllipsisHorizontalSharp />
            </n-icon>
          </n-dropdown>
        </div>
      </transition-group>
    </VueDraggableNext>

    <n-button type="primary" class="mt-4 w-56" @click="addNewSLClick">
      <template #icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
      新建分镜头
    </n-button>
    <ProjectEditModal
      v-if="showModal"
      :showModal="showModal"
      v-model:inputVal="current.name"
      placeholder="请输入新的名字"
      @cancelClick="changeShootNameClick('cancel')"
      @confirmClick="changeShootNameClick('edit')"
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * name: SLAside
 * description:
 * author: roct
 * date: 7:13 下午 2021/9/4
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
  getShootList,
  updateShootList,
  updateSorted,
  deleteShootList
} from '@/api/shootApi'
import { ShootType } from '@/api/apiType'
import { generateUUID } from '@/utils/uuid'
import { useMessage, useDialog } from 'naive-ui'
const slList: Ref<ShootType[]> = ref([])
const emit = defineEmits(['updateSelectedSL'])
const message = useMessage()
const route = useRoute()
const dialog = useDialog()
const showModal = ref(false)
const current: Ref<ShootType> = ref({
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
const changeShootNameClick = async (type: string) => {
  showModal.value = false
  if (type === 'edit') {
    await updateShootList(current.value)
  }
  await loadShootList()
}
/**
 * @Author roct
 * @Description 点击创建新的分镜头
 * @Date 7:21 下午 2021/9/4
 **/
const addNewSLClick = async () => {
  const shoot = {
    id: generateUUID(),
    projectId: route.query.id + '',
    name: '第' + (slList.value.length + 1) + '场' + generateUUID().substr(Math.floor(Math.random()*10+1), 2)
  }
  try {
    await updateShootList(shoot)
    message.success('保存成功')
    await loadShootList()
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
    await updateSorted(slList.value, route.query.id + '')
    await loadShootList()
  } catch (e) {
    message.error('调整顺序失败')
  }
}
/***
 * @Author roct
 * @Description 点击某个分镜头
 * @Date 9:11 下午 2021/9/3
 **/
const selectedItemClick = (item: ShootType) => {
  current.value = item
  emit('updateSelectedSL', item)
}
/**
 * @Author roct
 * @Description 删除某个分镜头
 * @Date 10:21 下午 2021/9/4
 **/
const deleteShootRequest = async (item: ShootType) => {
  try {
    await deleteShootList(item)
    message.success('删除成功')
    await loadShootList()
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
        deleteShootRequest(current.value)
      }
    })
  }
}
/***
 * @Author roct
 * @Description 加载分镜头列表
 * @Date 7:41 下午 2021/9/4
 **/
const loadShootList = async () => {
  try {
    slList.value = await getShootList(route.query.id + '')
    if (slList.value.length > 0) {
      selectedItemClick(slList.value[0])
    }
  } catch (e) {
    message.error('获取分镜头列表失败')
  }
}
onMounted(() => {
  loadShootList()
})
</script>
<style scoped lang="scss">
.sl-aside-item {
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
  .sl-aside-item-icon {
    display: none;
  }
  &:hover {
    .sl-aside-item-icon {
      display: block;
    }
  }
  &.active {
    @apply bg-white;
    @apply text-black;
    .sl-aside-item-icon {
      display: block;
    }
  }
}
</style>
