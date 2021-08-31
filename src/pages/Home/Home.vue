<template>
  <div class="w-full h-full flex">
    <Aside @pushNext="pushNext" />
    <div class="fixed left-48 top-0 bottom-0 right-0 flex-auto">
      <router-view :key="key" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Aside from '@/components/Aside.vue'
import { ref } from 'vue'
import router from '@/router'
/**
 * name: Home
 * description:
 * author: roct
 * date: 2:14 下午 2021/8/28
 */
const key = ref('')
const pushNext = (Name: string) => {
  key.value = Name
  router.push({
    name: Name
  })
}
</script>
<style scoped lang="scss"></style>
