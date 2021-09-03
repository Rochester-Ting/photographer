<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
const themeOverrides = {
  common: {
    primaryColorHover: '#000000',
    primaryColor: '#000000',
    primaryColorPressed: '#000000',
    primaryColorSuppl: '#000000'
  }
}
</script>
