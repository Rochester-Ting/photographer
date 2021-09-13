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
    <div class="mt-4">通告管理</div>
    <VueDraggableNext v-model="TGList" @change="draggableEnd">
      <transition-group>
        <div
          class="TG-aside-item"
          v-for="(item, index) of TGList"
          :key="index"
          :class="item.id === current.id ? 'active' : ''"
          @click="selectedItemClick(item)"
        >
          {{ item.name || '新建通告' + (index + 1) }}
          <n-dropdown
            trigger="click"
            @select="handleSelect"
            :options="options"
            :show-arrow="true"
          >
            <n-icon class="TG-aside-item-icon">
              <EllipsisHorizontalSharp />
            </n-icon>
          </n-dropdown>
        </div>
      </transition-group>
    </VueDraggableNext>

    <n-button class="mt-4 w-56" @click="addNewTGClick">
      <template #icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
      新建通告
    </n-button>
    <ProjectEditModal
      v-if="showModal"
      :showModal="showModal"
      v-model:inputVal="current.name"
      placeholder="请输入新的名字"
      @cancelClick="changeTGNameClick('cancel')"
      @confirmClick="changeTGNameClick('edit')"
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Aside
 * description:
 * author: roct
 * date: 10:04 下午 2021/9/10
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
  getTGList,
  updateTGList,
  updateSorted,
  deleteTGList
} from '@/api/takeNoticedApi'
import { TGType } from '@/api/apiType'
import { generateUUID } from '@/utils/uuid'
import { useMessage, useDialog } from 'naive-ui'
const TGList: Ref<TGType[]> = ref([])
const emit = defineEmits(['updateSelectedTG', 'hidden'])
const message = useMessage()
const route = useRoute()
const dialog = useDialog()
const showModal = ref(false)
const current: Ref<TGType> = ref({
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
const changeTGNameClick = async (type: string) => {
  showModal.value = false
  if (type === 'edit') {
    await updateTGList(current.value)
  }
  await loadTGList()
}
/**
 * @Author roct
 * @Description 点击创建新的分镜头
 * @Date 7:21 下午 2021/9/4
 **/
const addNewTGClick = async () => {
  const TG = {
    id: generateUUID(),
    projectId: route.query.id + '',
    name:
      '第' +
      (TGList.value.length + 1) +
      '场' +
      generateUUID().substr(Math.floor(Math.random() * 10 + 1), 2)
  }
  try {
    await updateTGList(TG)
    message.success('保存成功')
    await loadTGList()
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
    await updateSorted(TGList.value, route.query.id + '')
    await loadTGList()
  } catch (e) {
    message.error('调整顺序失败')
  }
}
/***
 * @Author roct
 * @Description 点击某个分镜头
 * @Date 9:11 下午 2021/9/3
 **/
const selectedItemClick = (item: TGType) => {
  current.value = item
  emit('updateSelectedTG', item)
}
/**
 * @Author roct
 * @Description 删除某个分镜头
 * @Date 10:21 下午 2021/9/4
 **/
const deleteTGRequest = async (item: TGType) => {
  try {
    await deleteTGList(item)
    message.success('删除成功')
    await loadTGList()
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
        deleteTGRequest(current.value)
      }
    })
  }
}
/***
 * @Author roct
 * @Description 加载分镜头列表
 * @Date 7:41 下午 2021/9/4
 **/
const loadTGList = async () => {
  try {
    TGList.value = await getTGList(route.query.id + '')
    if (TGList.value.length > 0) {
      selectedItemClick(TGList.value[0])
      emit('hidden', true)
    } else {
      emit('hidden', false)
    }
  } catch (e) {
    message.error('获取分镜头列表失败')
  }
}
onMounted(() => {
  loadTGList()
})
</script>
<style scoped lang="scss">
.TG-aside-item {
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
  .TG-aside-item-icon {
    display: none;
  }
  &:hover {
    .TG-aside-item-icon {
      display: block;
    }
  }
  &.active {
    @apply bg-white;
    @apply text-black;
    .TG-aside-item-icon {
      display: block;
    }
  }
}
</style>
