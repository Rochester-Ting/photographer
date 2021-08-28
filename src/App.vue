<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColorHover: '#000000',
    primaryColor: '#000000',
    primaryColorPressed: '#000000',
    primaryColorSuppl: '#000000'
  }
}
</script>
