<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :themeOverrides="themeOverrides"
  >
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui'
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColorHover: '#666666',
    primaryColor: '#000000',
    primaryColorPressed: '#000000',
    primaryColorSuppl: '#000000'
  },
  TimePicker: {
    borderColor: 'transparent'
  },
  Menu: {
    itemIconColor: '#ffffff',
    itemIconColorHover: '#ffffff',
    itemIconColorActive: '#ffffff',
    itemTextColor: '#ffffff',
    itemTextColorHover: '#ffffff',
    itemTextColorActive: '#ffffff',
    itemColorActive: '#0878B0'
  }
}
</script>
