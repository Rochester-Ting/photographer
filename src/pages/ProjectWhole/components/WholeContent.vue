<template>
  <div class="p-10 pt-5 flex-auto w-full">
    <div class="text-3xl pb-5">{{ props.name }}</div>
    <n-divider />
    <div class="">
      <div class="flex items-center bg-gray-100 h-10 text-gray-500 text-sm">
        <div class="w-40 pl-4">场景类型</div>
        <div class="w-40 pl-2">场景时间</div>
        <div class="w-40 pl-2">场景陈设</div>
        <div class="flex-auto ml-4 pl-2.5">场景简述</div>
      </div>
      <div class="flex items-center h-10 text-gray-500 text-sm mt-2.5">
        <div class="w-40 pl-4">
          <n-popselect
            :options="lxOptions"
            v-model:value="PWInfo.cj.cjlx"
            @update:value="updateRequest"
            trigger="click"
            scrollable
          >
            <div class="flex items-center cursor-pointer">
              {{ PWInfo.cj.cjlx || '类型' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </div>
          </n-popselect>
        </div>
        <div class="w-40 pl-2">
          <n-popselect
            :options="sjOptions"
            v-model:value="PWInfo.cj.cjsj"
            @update:value="updateRequest"
            trigger="click"
            scrollable
          >
            <div class="flex items-center cursor-pointer">
              {{ PWInfo.cj.cjsj || '时间' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </div>
          </n-popselect>
        </div>
        <input
          class="input w-40"
          v-model="PWInfo.cj.cjcs"
          type="text"
          @blur="updateRequest"
          placeholder="请输入内容描述"
        />
        <input
          class="input ml-4 flex-auto"
          v-model="PWInfo.cj.cjjs"
          type="text"
          @blur="updateRequest"
          placeholder="请输入内容描述"
        />
      </div>
    </div>
    <n-divider />
  </div>
</template>
<script lang="ts" setup>
/**
 * name: WholeContent
 * description:
 * author: roct
 * date: 8:35 下午 2021/9/5
 */
import {
  ref,
  Ref,
  watch,
  watchEffect,
  defineEmits,
  defineProps,
  nextTick
} from 'vue'
import { CaretDownSharp } from '@vicons/ionicons5'
import { getPWDetailInfo, savePWDetail } from '@/api/PWDetailApi'
import { PWDetailType } from '@/api/apiType'
import { lxOptions, sjOptions } from './options'
import { generateUUID } from '@/utils/uuid'
import { useMessage } from 'naive-ui'

interface Props {
  PWId: string
  name: string
}
const props = defineProps<Props>()
const message = useMessage()
const PWInfo: Ref<PWDetailType> = ref({
  id: '',
  name: '',
  PWId: '',
  cj: {
    cjlx: '',
    cjsj: '',
    cjcs: '',
    cjjs: ''
  },
  dj: []
})
watch(
  () => props.PWId,
  () => {
    loadPWDetailInfo()
  }
)
watchEffect(() => {
  nextTick(() => {
    loadPWDetailInfo()
  })
})
const loadPWDetailInfo = async () => {
  PWInfo.value = await getPWDetailInfo(props.PWId)
}
const updateRequest = async () => {
  if (!PWInfo.value.id) {
    PWInfo.value.id = generateUUID()
  }
  if (!PWInfo.value.PWId) {
    PWInfo.value.PWId = props.PWId
  }
  try {
    await savePWDetail(PWInfo.value)
  } catch (e) {
    message.error('保存失败')
  }
}
</script>
<style scoped lang="scss"></style>
