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
    <div class="mt-4">分镜头列表</div>
    <div
      class="sl-aside-item"
      v-for="(item, index) of slList"
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
        <n-icon class="sl-aside-item-icon">
          <EllipsisHorizontalSharp />
        </n-icon>
      </n-dropdown>
    </div>
    <n-button class="mt-4 w-56" @click="addNewSLClick">
      <template #icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
      新建分镜头
    </n-button>
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
import { onMounted, Ref, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { getShootList, updateShootList, deleteShootList } from '@/api/shootApi'
import { ShootType } from '@/api/apiType'
import { generateUUID } from '@/utils/uuid'
import { useMessage, useDialog } from 'naive-ui'
const slList: Ref<ShootType> = ref([])
const emit = defineEmits(['updateSelectedSL'])
const message = useMessage()
const dialog = useDialog()
const current: ShootType = {
  id: '',
  name: '',
  projectId: ''
}
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
 * @Description 点击创建新的分镜头
 * @Date 7:21 下午 2021/9/4
 **/
const addNewSLClick = async () => {
  const shoot = {
    id: generateUUID(),
    projectId: useRoute().query.id + '',
    name: '第' + (slList.value.length + 1) + '场'
  }
  try {
    await updateShootList(shoot)
    message.success('保存成功')
  } catch (e) {
    message.error('保存失败')
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
 * @Description 点击dropdown
 * @Date 9:24 下午 2021/9/3
 **/
const handleSelect = async (key: string, item: ShootType) => {
  // editGroup.value = item
  // if (key === 'edit') {
  //   // showModal.value = true
  // }
  // if (key === 'delete') {
  //   dialog.error({
  //     title: '提示',
  //     content: '是否删除?',
  //     positiveText: '确定',
  //     showIcon: false,
  //     negativeText: '取消',
  //     onPositiveClick: () => {
  //       // deleteProjectGroupClick(item)
  //     }
  //   })
  // }
}
/***
 * @Author roct
 * @Description 加载分镜头列表
 * @Date 7:41 下午 2021/9/4
 **/
const loadShootList = async () => {
  try {
    slList.value = await getShootList(useRoute().query.id + '')
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
