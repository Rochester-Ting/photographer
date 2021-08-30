<template>
  <div class="w-full h-full flex">
    <Aside />
    <div class="fixed left-48 top-0 bottom-0 right-0 flex-auto bg-green-50">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Aside from '@/components/Aside.vue'
/**
 * name: Home
 * description:
 * author: roct
 * date: 2:14 下午 2021/8/28
 */
</script>
<style scoped lang="scss"></style>
