<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="(item, index) of routeList"
      :key="index"
      v-show="item.name !== 'Home'"
    >
      {{ item.meta.name }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
<script lang="ts" setup>
/**
 * name: Header
 * description:
 * author: roct
 * date: 10:22 下午 2021/8/31
 */
import { useRoute } from 'vue-router'
const route = useRoute()
console.log('route', route)
const routeList = route.matched
</script>
<style scoped lang="scss"></style>
