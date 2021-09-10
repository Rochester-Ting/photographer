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
    <div class="text-3xl pb-5">道具</div>
    <div class="flex flex-wrap">
      <div
        class="
          w-32
          h-32
          flex
          items-center
          justify-center
          border border-solid border-gray-100
          mr-5
          rounded
          mb-5
          relative
          dj-item
        "
        v-for="(item, index) of PWInfo.dj"
        :key="index"
      >
        <n-icon
          class="dj-icon absolute top-2 right-2"
          @click.stop="deleteDj(item)"
        >
          <CloseOutline />
        </n-icon>
        {{ item }}
      </div>
    </div>
    <n-divider />
    <n-dropdown
      trigger="hover"
      @select="handleSelect"
      :options="options"
      style="max-height: 300px; overflow: auto"
    >
      <n-button>点击选择道具</n-button>
    </n-dropdown>
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
import { CaretDownSharp, CloseOutline } from '@vicons/ionicons5'
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
const options = [
  {
    label: '演员',
    key: '演员'
  },
  {
    label: '群演',
    key: '群演'
  },
  {
    label: '打斗/特技',
    key: '打斗/特技'
  },
  {
    label: '车辆',
    key: '车辆'
  },
  {
    label: '道具',
    key: '道具'
  },
  {
    label: '后期特效',
    key: '后期特效'
  },
  {
    label: '化妆/发型',
    key: '化妆/发型'
  },
  {
    label: '动物',
    key: '动物'
  },
  {
    label: '配乐',
    key: '配乐'
  },
  {
    label: '录音',
    key: '录音'
  },
  {
    label: '布景',
    key: '布景'
  },
  {
    label: '特殊设备',
    key: '特殊设备'
  },
  {
    label: '安保',
    key: '安保'
  },
  {
    label: '额外劳力',
    key: '额外劳力'
  },
  {
    label: '视觉效果',
    key: '视觉效果'
  },
  {
    label: '杂项',
    key: '杂项'
  }
]
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

const handleSelect = async (key: string) => {
  if (PWInfo.value.dj.indexOf(key) > -1) {
    message.error('无法重复添加')
    return
  }
  PWInfo.value.dj.push(key)
  await savePWDetail(PWInfo.value)
}
const deleteDj = async (key: string) => {
  const index = PWInfo.value.dj.indexOf(key)
  if (index !== -1) {
    PWInfo.value.dj.splice(index, 1)
    await savePWDetail(PWInfo.value)
  }
}
</script>
<style scoped lang="scss">
.dj-item {
  cursor: pointer;
  .dj-icon {
    display: none;
  }
  &:hover {
    .dj-icon {
      display: block;
    }
  }
}
</style>
