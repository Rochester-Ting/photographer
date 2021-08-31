<template>
  <div>
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
      <Header />
      <n-button>
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        新建项目
      </n-button>
    </div>
    <div class="project-content flex">
      <div class="flex flex-col items-center w-60 bg-gray-100 overflow-auto">
        <div class="mt-4">项目组管理</div>
        <div
          class="project-aside-item"
          v-for="item in 10"
          :key="item"
          :class="item === current.value ? 'active' : ''"
          @click="selectedItemClick(item)"
        >
          项目组{{ item }}
          <n-icon class="project-aside-item-icon">
            <EllipsisHorizontalSharp />
          </n-icon>
        </div>
        <n-button class="mt-4 w-56">
          <template #icon>
            <n-icon>
              <add-icon />
            </n-icon>
          </template>
          新建项目组
        </n-button>
      </div>
      <div class="flex-auto bg-green-50 h-auto"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Project
 * description:
 * author: roct
 * date: 9:49 下午 2021/8/31
 */
import {
  AddOutline as AddIcon,
  EllipsisHorizontalSharp
} from '@vicons/ionicons5'
import Header from '@/components/Header.vue'
import { Ref, ref } from 'vue'
import { ProjectItemType } from './ProjectTypes'
const current: Ref<ProjectItemType> = ref({
  name: '',
  value: 2
})
const selectedItemClick = (value: number) => {
  current.value.value = value
}
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
