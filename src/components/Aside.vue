<template>
  <div class="fixed left-0 top-0 bottom-0 w-48 flex-shrink-0">
    <n-menu
      :inverted="inverted"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Aside
 * description:
 * author: roct
 * date: 11:03 下午 2021/8/30
 */
import { ref, h } from 'vue'
import { NIcon } from 'naive-ui'
import {
  ApertureOutline,
  BalloonOutline,
  CaretBackCircleOutline,
  RocketOutline,
  ConstructOutline
} from '@vicons/ionicons5'
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: '所有项目',
    key: 'hear-the-wind-sing',
    icon: renderIcon(ApertureOutline)
  },
  {
    label: '团队管理',
    key: 'pinball-1973',
    icon: renderIcon(BalloonOutline)
  },
  {
    label: '在线审片',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(CaretBackCircleOutline)
  },
  {
    label: '日程安排',
    key: 'dance-dance-dance',
    icon: renderIcon(RocketOutline)
  },
  {
    label: '设置',
    key: 'dance-dance-dance',
    icon: renderIcon(ConstructOutline)
  }
]
const inverted = ref(false)
</script>
<style scoped lang="scss"></style>
