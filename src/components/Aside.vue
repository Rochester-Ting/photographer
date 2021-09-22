<template>
  <div
    class="
      fixed
      left-0
      top-0
      bottom-0
      w-48
      flex-shrink-0
      border-r border-solid border-gray-50
    "
  >
    <div class="mt-20 flex flex-col items-center">
      <img
        class="w-32 h-32 rounded-full"
        src="@/assets/aside/icon.jpeg"
        alt=""
      />
      <span class="text-gray-400 mt-5">Roman Kutepoy</span>
      <span class="text-gray-300 mt-1 mb-5" style="font-size: 14px">
        导演、制片人
      </span>
    </div>
    <n-menu
      @update:value="changeRouter"
      v-model:value="defaultValue"
      :options="menuOptions"
      :inverted="inverted"
      :collapsed-width="64"
      :collapsed-icon-size="22"
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
import { ref, h, onMounted, defineEmits } from 'vue'
import { NIcon } from 'naive-ui'
import { useRoute } from 'vue-router'
import {
  ApertureOutline,
  BalloonOutline,
  CaretBackCircleOutline,
  RocketOutline,
  ConstructOutline
} from '@vicons/ionicons5'
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: '所有项目',
    key: 'Project',
    icon: renderIcon(ApertureOutline)
  },
  {
    label: '团队管理',
    key: 'Team',
    icon: renderIcon(BalloonOutline)
  },
  {
    label: '在线审片',
    key: 'Piece',
    icon: renderIcon(CaretBackCircleOutline)
  },
  {
    label: '日程安排',
    key: 'Schedule',
    icon: renderIcon(RocketOutline)
  },
  {
    label: '设置',
    key: 'Setting',
    icon: renderIcon(ConstructOutline)
  }
]
const inverted = ref(false)

const emit = defineEmits(['pushNext'])

const defaultValue = ref('')
onMounted(() => {
  defaultValue.value = useRoute().meta.key + '' || 'Project'
})

const changeRouter = (Name: string) => {
  emit('pushNext', Name)
}
</script>
<style scoped lang="scss"></style>
