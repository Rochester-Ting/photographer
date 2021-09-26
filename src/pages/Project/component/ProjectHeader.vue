<template>
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
    style="background-color: white"
  >
    <Header />
    <n-button
      type="primary"
      @click="createNewProjectClick"
      :disabled="props.projectGroupList.length === 0"
    >
      <template #icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
      新建项目
    </n-button>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: ProjectHeader
 * description:
 * author: roct
 * date: 12:26 下午 2021/9/4
 */
import { defineProps, defineEmits } from 'vue'
import { ProjectItemGroupType } from '@/api/apiType'
import Header from '@/components/Header.vue'
import { AddOutline as AddIcon } from '@vicons/ionicons5'
interface Props {
  projectGroupList: ProjectItemGroupType[]
}
const props = defineProps<Props>()
const emit = defineEmits(['createNewProjectClick'])
const createNewProjectClick = () => {
  emit('createNewProjectClick')
}
</script>
<style scoped lang="scss"></style>
