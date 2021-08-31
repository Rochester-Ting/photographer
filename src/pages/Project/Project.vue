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
          class="w-full px-5 h-10 leading-10 cursor-pointer hover:bg-white"
          v-for="item in 10"
          :key="item"
        >
          项目组{{ item }}
        </div>
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
import { AddOutline as AddIcon } from '@vicons/ionicons5'
import Header from '@/components/Header.vue'
</script>
<style scoped lang="scss">
.project-content {
  height: calc(100vh - 64px);
}
</style>
