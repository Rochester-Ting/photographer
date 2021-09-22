<template>
  <div class="m-10 mt-5 flex-auto w-full overflow-y-auto overflow-x-hidden">
    <div
      class="
        bg-gray-100
        flex flex-col
        items-center
        pb-10
        overflow-y-auto overflow-x-hidden
      "
    >
      <div class="flex items-center text-3xl mt-10">
        <n-gradient-text
          :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)'
          }"
        >
          通告单通过 Wonder Wrap 制作
        </n-gradient-text>
      </div>

      <n-divider class="w-custom" />
      <n-input
        size="medium"
        style="width: 680px"
        class="w-custom mt-5"
        type="text"
        placeholder="输入标题"
        v-model:value="detail.title"
        @blur="saveDetail"
      />
      <div
        class="mt-5 text-gray-500 text-gray-500 text-sm mb-2 flex items-center"
      >
        <n-icon class="mr-1"> <StopwatchOutline /> </n-icon>拍摄时间
      </div>
      <n-date-picker
        size="medium"
        style="width: 680px"
        class="w-custom"
        placeholder="拍摄时间"
        v-model:value="detail.time"
        type="datetime"
        clearable
        @blur="saveDetail"
      />
      <div class="mt-5 text-gray-500 text-sm mb-2 flex items-center">
        <n-icon class="mr-1">
          <LocationOutline />
        </n-icon>
        拍摄地址
      </div>
      <n-input
        size="medium"
        style="width: 680px"
        class="w-custom"
        type="text"
        placeholder="输入地址"
        v-model:value="detail.address"
        @blur="saveDetail"
      />
      <n-input
        style="width: 680px"
        size="medium"
        class="w-custom mt-5"
        type="text"
        v-model:value="detail.remark"
        placeholder="输入备注(可选)"
        @blur="saveDetail"
      />
      <n-input
        style="width: 680px"
        size="medium"
        class="w-custom mt-5"
        type="text"
        v-model:value="detail.description"
        placeholder="内容描述"
        @blur="saveDetail"
      />
      <n-divider class="w-custom" />
      <n-gradient-text
        :gradient="{
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
      >
        拍摄顺序
      </n-gradient-text>
      <n-divider class="w-custom" />
      <div class="w-custom">
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
        >
          <span class="w-20">场次</span>
          <span class="w-28"> 内景/外景 </span>
          <span class="w-28"> 日景/夜景 </span>
          <span class="flex-auto">内容简述</span>
          <span class="w-20">备注</span>
          <span class="w-20">预估耗时(/h)</span>
          <span class="w-14">操作</span>
        </div>
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
          v-for="(item, index) of detail.pssx"
          :key="index"
        >
          <span class="w-20">{{ item.cc }}</span>
          <n-popselect
            v-model:value="item.nwj"
            :options="options"
            size="medium"
            trigger="click"
            @update:value="saveDetail"
          >
            <span class="w-28 cursor-pointer">
              {{ item.nwj || '内景/外景' }}
              <n-icon> <CaretDownSharp /> </n-icon>
            </span>
          </n-popselect>
          <n-popselect
            v-model:value="item.ryj"
            :options="options1"
            size="medium"
            trigger="click"
            @update:value="saveDetail"
          >
            <span class="w-28 cursor-pointer">
              {{ item.ryj || '日景/夜景' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </span>
          </n-popselect>
          <input
            class="hidden-input flex-auto"
            v-model="item.description"
            placeholder="内容简述"
            @blur="saveDetail"
          />
          <input
            class="hidden-input w-20"
            v-model="item.remark"
            placeholder="备注"
            @blur="saveDetail"
          />
          <input
            class="hidden-input w-20"
            v-model="item.yghs"
            type="number"
            placeholder="耗时"
            @blur="saveDetail"
          />
          <n-popconfirm @positive-click="pssxDeleteClick(index)">
            <template #trigger>
              <span class="w-14 cursor-pointer underline text-red-700">
                删除
              </span>
            </template>
            是否删除
          </n-popconfirm>
        </div>
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
        >
          <span class="w-20">总计</span>
          <span class="w-28 cursor-pointer"> </span>
          <span class="w-28 cursor-pointer"> </span>
          <span class="flex-auto"></span>
          <span class="w-20"></span>
          <span class="w-20"> {{ calHour }}小时 </span>
          <span class="w-14"> </span>
        </div>
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
        >
          <input
            class="hidden-input w-20"
            v-model="pssx.cc"
            placeholder="场次"
          />
          <!-- <span class="w-20">{{ props.name }}</span> -->
          <n-popselect
            v-model:value="pssx.nwj"
            :options="options"
            size="medium"
            trigger="click"
          >
            <span class="w-28 cursor-pointer">
              {{ pssx.nwj || '内景/外景' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </span>
          </n-popselect>
          <n-popselect
            v-model:value="pssx.ryj"
            :options="options"
            size="medium"
            trigger="click"
          >
            <span style="width: 100px" class="w-28 cursor-pointer">
              {{ pssx.ryj || '日景/夜景' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </span>
          </n-popselect>
          <input
            class="hidden-input flex-auto"
            v-model="pssx.description"
            placeholder="内容简述"
          />
          <input
            class="hidden-input w-20"
            v-model="pssx.remark"
            placeholder="备注"
          />
          <input
            class="hidden-input w-20"
            v-model="pssx.yghs"
            type="number"
            placeholder="耗时"
          />
          <span
            class="w-14 cursor-pointer underline text-green-700"
            @click="pssxAddClick"
          >
            添加
          </span>
        </div>
      </div>
      <n-divider class="w-custom" />
      <n-gradient-text
        :gradient="{
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
      >
        演职人员
      </n-gradient-text>
      <n-divider class="w-custom" />
      <div class="w-custom">
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
        >
          <span class="w-20">姓名</span>
          <span class="w-28"> 职务 </span>
          <span class="w-28"> 到场时间 </span>
          <span class="flex-auto">备注</span>
          <span class="w-20">操作</span>
        </div>
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
          v-for="(item, index) of detail.yzry"
          :key="index"
        >
          <input
            class="hidden-input w-20"
            v-model="item.name"
            placeholder="姓名"
            @blur="saveDetail"
          />
          <input
            class="hidden-input w-28"
            v-model="item.zw"
            placeholder="职务"
            @blur="saveDetail"
          />
          <n-time-picker
            class="w-28 n-time-picker"
            v-model:value="item.dcsj"
            placeholder="到场时间"
            @blur="saveDetail"
          />
          <input
            class="hidden-input flex-auto"
            v-model="item.nrms"
            placeholder="备注"
            @blur="saveDetail"
          />
          <n-popconfirm @positive-click="yzryDeleteClick(index)">
            <template #trigger>
              <span class="w-20 cursor-pointer underline text-red-700">
                删除
              </span>
            </template>
            是否删除
          </n-popconfirm>
        </div>
        <div
          class="
            flex
            items-center
            h-10
            text-gray-500 text-sm
            border-solid border-b border-gray-300
          "
        >
          <input
            class="hidden-input w-20"
            v-model="yzry.name"
            placeholder="姓名"
          />
          <input
            class="hidden-input w-28"
            v-model="yzry.zw"
            placeholder="职务"
          />
          <n-time-picker
            class="w-28 n-time-picker"
            v-model:value="yzry.dcsj"
            placeholder="到场时间"
          />
          <input
            class="hidden-input flex-auto"
            v-model="yzry.nrms"
            placeholder="备注"
          />
          <span
            class="w-20 cursor-pointer underline text-green-700"
            @click="yzryAddClick"
          >
            添加
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Content
 * description:
 * author: roct
 * date: 10:12 下午 2021/9/10
 */
import {
  StopwatchOutline,
  LocationOutline,
  CaretDownSharp
} from '@vicons/ionicons5'
import {
  computed,
  defineProps,
  onMounted,
  reactive,
  ref,
  Ref,
  watch,
  watchEffect
} from 'vue'
import { useMessage } from 'naive-ui'
import { saveTGDetail, getTGDetail } from '@/api/takeNoticedDetailApi'
import { PssxType, YzryType, TGDetailType } from '@/api/apiType'
import { useRoute } from 'vue-router'
interface Props {
  id: string
  name: string
}
const props = defineProps<Props>()
const message = useMessage()
const route = useRoute()

let detail: TGDetailType = reactive({
  title: '', // 标题
  time: undefined, // 拍摄时间
  address: '', // 拍摄地址
  remark: '', // 备注
  description: '', // 内容描述
  pssx: [],
  yzry: []
})
let pssx: PssxType = reactive({
  nwj: '',
  ryj: '',
  description: '',
  remark: '',
  yghs: '',
  cc: ''
})

let yzry: YzryType = reactive({
  name: '',
  zw: '',
  dcsj: null,
  nrms: '',
  remark: ''
})
let options = [
  {
    label: '内景',
    value: '内景'
  },
  {
    label: '外景',
    value: '外景'
  }
]

const options1 = [
  {
    label: '日景',
    value: '日景'
  },
  {
    label: '夜景',
    value: '夜景'
  }
]
watch(
  () => props.id,
  () => {
    console.log('============', props.id)
    getDetail()
  }
)
// watchEffect(() => {
//   getDetail()
// })
const calHour = computed(() => {
  let hour = 0
  for (const item of detail.pssx) {
    const time = Number(item.yghs)
    hour = isNaN(time) ? hour : hour + time
  }
  return hour
})
/**
 * @Author roct
 * @Description 删除演职人员
 * @Date 5:16 下午 2021/9/12
 **/
const yzryDeleteClick = async (index: number) => {
  detail.yzry.splice(index, 1)
  await saveDetail()
}
/**
 * @Author roct
 * @Description 删除拍摄顺序
 * @Date 5:16 下午 2021/9/12
 **/
const pssxDeleteClick = async (index: number) => {
  detail.pssx.splice(index, 1)
  await saveDetail()
}
/**
 * @Author roct
 * @Description 添加演职人员
 * @Date 5:16 下午 2021/9/12
 **/
const yzryAddClick = async () => {
  if (!yzry.name || !yzry.zw || !yzry.dcsj || !yzry.nrms) {
    message.error('请填写完整的演职人员信息')
    return
  }
  detail.yzry.push(JSON.parse(JSON.stringify(yzry)))
  yzry.name = ''
  yzry.zw = ''
  yzry.dcsj = null
  yzry.nrms = ''
  yzry.remark = ''
  await saveDetail()
}
/**
 * @Author roct
 * @Description 添加拍摄顺序
 * @Date 5:16 下午 2021/9/12
 **/
const pssxAddClick = async () => {
  if (!pssx.nwj || !pssx.ryj || !pssx.description || !pssx.yghs || !pssx.cc) {
    message.error('请填写完整的拍摄顺序')
    return
  }
  detail.pssx.push(JSON.parse(JSON.stringify(pssx)))
  pssx.nwj = ''
  pssx.ryj = ''
  pssx.description = ''
  pssx.remark = ''
  pssx.yghs = ''
  pssx.cc = ''
  await saveDetail()
}
const getDetail = async () => {
  const res = await getTGDetail(props.id)
  // if (res) {
  detail.title = res && res.title ? res.title : ''
  detail.time = res && res.time ? res.time : null
  detail.address = res && res.address ? res.address : ''
  detail.description = res && res.description ? res.description : ''
  detail.remark = res && res.remark ? res.remark : ''
  detail.pssx = res && res.pssx ? res.pssx : []
  detail.yzry = res && res.yzry ? res.yzry : []
  for (const item of detail.yzry) {
    item.dcsj = Number((item && item.dcsj) || 0)
  }
  // } else {
  //   detail.title = res.title || ''
  //   detail.time = res.time || null
  //   detail.address = res.address || ''
  //   detail.description = res.description || ''
  //   detail.remark = res.remark || ''
  //   detail.pssx = res.pssx || ''
  //   detail.yzry = res.yzry || ''
  //   for (const item of detail.yzry) {
  //     item.dcsj = Number(item.dcsj)
  //   }
  // }
}

const saveDetail = async () => {
  await saveTGDetail(props.id, detail)
}

onMounted(() => {
  getDetail()
})
</script>
<style scoped lang="scss">
.hidden-input {
  outline: none;
  background: transparent;
  resize: none;
  border-radius: 5px;
  @apply p-1.5;
  text-align: center;
  &:hover {
    @apply border-gray-300;
    @apply border;
    @apply border-solid;
  }
}
input {
  text-align: center;
}
input::-ms-input-placeholder {
  text-align: center;
}
input::-webkit-input-placeholder {
  text-align: center;
}

.w-custom {
  width: 680px;
  text-align: center;
}
.text-sm {
  text-align: center;
}
:deep(.n-time-picker) {
  .n-input-wrapper {
    background: rgba(243, 244, 246, 1) !important;
    &:hover {
      border: 1px;
    }
  }
}
</style>
