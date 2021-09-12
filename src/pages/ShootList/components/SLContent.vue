<template>
  <div class="p-10 pt-5 flex-auto w-full">
    <div class="text-3xl pb-5">{{ props.name }}</div>
    <div>
      <div class="flex items-center h-10 bg-gray-50 text-gray-500 text-sm">
        <span class="w-20 pl-2">场次</span>
        <span class="w-20 pl-2">镜号</span>
        <span class="flex-auto pl-2">内容描述</span>
        <span class="w-32 pl-4">景别</span>
        <span class="w-52 pl-4">镜头类型</span>
        <span class="w-40 pl-4">机位运动</span>
        <span class="w-40 pl-2">备注</span>
        <span class="w-32 pl-4">操作</span>
      </div>
      <VueDraggableNext v-model="data" @change="draggableEnd">
        <transition-group>
          <div
            class="
              flex
              items-center
              w-full
              h-10
              text-gray-500 text-sm text-gray-500
            "
            v-for="(item, index) of data"
            :key="index"
          >
            <input
              class="input w-20 h-10"
              :value="props.name"
              type="text"
              :disabled="true"
              @blur="updateRequest"
              placeholder="场次"
            />
            <input
              class="input w-20 h-10"
              v-model="item.jh"
              type="text"
              @blur="updateRequest"
              placeholder="镜号"
            />
            <input
              class="input flex-auto"
              v-model="item.nrms"
              type="text"
              @blur="updateRequest"
              placeholder="请输入内容描述"
            />

            <div class="w-32 pl-4">
              <n-popselect
                :options="jbOptions"
                v-model:value="item.jb"
                @update:value="updateRequest"
                trigger="click"
                scrollable
              >
                <div class="flex items-center cursor-pointer">
                  {{ item.jb || '景别' }}
                  <n-icon>
                    <CaretDownSharp />
                  </n-icon>
                </div>
              </n-popselect>
            </div>
            <div class="w-52 pl-4">
              <n-popover trigger="click">
                <template #trigger>
                  <div class="flex items-center cursor-pointer">
                    {{
                      !item.jtgd && !item.hmgt && !item.dsqx
                        ? '镜头类型'
                        : (item.jtgd ? item.jtgd : '') +
                          '/' +
                          (item.dsqx ? item.dsqx : '') +
                          '/' +
                          (item.hmgt ? item.hmgt : '')
                    }}
                    <n-icon>
                      <CaretDownSharp />
                    </n-icon>
                  </div>
                </template>
                <div class="w-80 h-80 bg-white flex flex-wrap">
                  <div class="w-1/2 h-1/2 flex-col">
                    <div class="font-bold">镜头高度</div>
                    <n-radio-group
                      class="ml-2"
                      v-model:value="item.jtgd"
                      @update:value="updateRequest"
                    >
                      <n-space>
                        <n-radio
                          v-for="(song, index) of jtOptions"
                          :key="index"
                          :value="song.value"
                        >
                          {{ song.label }}
                        </n-radio>
                      </n-space>
                    </n-radio-group>
                  </div>
                  <div class="w-1/2 h-1/2">
                    <div class="font-bold">德式倾斜</div>
                    <n-radio-group
                      class="ml-2"
                      v-model:value="item.dsqx"
                      @update:value="updateRequest"
                    >
                      <n-space>
                        <n-radio
                          v-for="(song, index) of dsqxOptions"
                          :key="index"
                          :value="song.value"
                        >
                          {{ song.label }}
                        </n-radio>
                      </n-space>
                    </n-radio-group>
                  </div>
                  <div class="w-1/2 h-1/2">
                    <div class="font-bold">画面/构图</div>
                    <n-radio-group
                      class="ml-2"
                      v-model:value="item.hmgt"
                      @update:value="updateRequest"
                    >
                      <n-space>
                        <n-radio
                          v-for="(song, index) of hmgtOptions"
                          :key="index"
                          :value="song.value"
                        >
                          {{ song.label }}
                        </n-radio>
                      </n-space>
                    </n-radio-group>
                  </div>
                  <div class="w-1/2 h-1/2" style="position: relative">
                    <n-button
                      class="absolute bottom-2 left-2"
                      @click="resetJt(item)"
                      >重置</n-button
                    >
                  </div>
                </div>
              </n-popover>
            </div>
            <div class="w-40 pl-4">
              <n-popselect
                :options="jwOptions"
                v-model:value="item.jwyd"
                @update:value="updateRequest"
                trigger="click"
                scrollable
              >
                <div class="flex items-center cursor-pointer">
                  {{ item.jwyd || '机位运动' }}
                  <n-icon>
                    <CaretDownSharp />
                  </n-icon>
                </div>
              </n-popselect>
            </div>
            <input
              class="input w-40"
              v-model="item.bz"
              type="text"
              @blur="updateRequest"
              placeholder="请输入内容描述"
            />
            <span
              class="w-32 pl-4 cursor-pointer underline text-red-700"
              @click="deleteShootDetailClick(item)"
            >
              删除
            </span>
          </div>
        </transition-group>
      </VueDraggableNext>
      <div class="flex items-center h-10 text-gray-500 text-sm text-gray-500">
        <input
          class="input w-20 h-10"
          :disabled="true"
          :value="props.name"
          type="text"
          placeholder="场次"
        />
        <input
          class="input w-20 h-10"
          v-model="newData.jh"
          type="text"
          placeholder="镜号"
        />
        <input
          class="input flex-auto"
          v-model="newData.nrms"
          type="text"
          placeholder="请输入内容描述"
        />

        <div class="w-32 pl-4">
          <n-popselect
            :options="jbOptions"
            v-model:value="newData.jb"
            trigger="click"
            scrollable
          >
            <div class="flex items-center cursor-pointer">
              {{ newData.jb || '景别' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </div>
          </n-popselect>
        </div>
        <div class="w-52 pl-4">
          <n-popover trigger="click">
            <template #trigger>
              <div class="flex items-center cursor-pointer">
                {{
                  !newData.jtgd && !newData.hmgt && !newData.dsqx
                    ? '镜头类型'
                    : (newData.jtgd ? newData.jtgd : '') +
                      '/' +
                      (newData.dsqx ? newData.dsqx : '') +
                      '/' +
                      (newData.hmgt ? newData.hmgt : '')
                }}
                <n-icon>
                  <CaretDownSharp />
                </n-icon>
              </div>
            </template>
            <div class="w-80 h-80 bg-white flex flex-wrap">
              <div class="w-1/2 h-1/2 flex-col">
                <div class="font-bold">镜头高度</div>
                <n-radio-group class="ml-2" v-model:value="newData.jtgd">
                  <n-space>
                    <n-radio
                      v-for="(song, index) of jtOptions"
                      :key="index"
                      :value="song.value"
                    >
                      {{ song.label }}
                    </n-radio>
                  </n-space>
                </n-radio-group>
              </div>
              <div class="w-1/2 h-1/2">
                <div class="font-bold">德式倾斜</div>
                <n-radio-group class="ml-2" v-model:value="newData.dsqx">
                  <n-space>
                    <n-radio
                      v-for="(song, index) of dsqxOptions"
                      :key="index"
                      :value="song.value"
                    >
                      {{ song.label }}
                    </n-radio>
                  </n-space>
                </n-radio-group>
              </div>
              <div class="w-1/2 h-1/2">
                <div class="font-bold">画面/构图</div>
                <n-radio-group class="ml-2" v-model:value="newData.hmgt">
                  <n-space>
                    <n-radio
                      v-for="(song, index) of hmgtOptions"
                      :key="index"
                      :value="song.value"
                    >
                      {{ song.label }}
                    </n-radio>
                  </n-space>
                </n-radio-group>
              </div>
              <div class="w-1/2 h-1/2" style="position: relative">
                <n-button
                  class="absolute bottom-2 left-2"
                  @click="resetJt(newData)"
                  >重置</n-button
                >
              </div>
            </div>
          </n-popover>
        </div>
        <div class="w-40 pl-4">
          <n-popselect
            :options="jwOptions"
            v-model:value="newData.jwyd"
            trigger="click"
            scrollable
          >
            <div class="flex items-center cursor-pointer">
              {{ newData.jwyd || '机位运动' }}
              <n-icon>
                <CaretDownSharp />
              </n-icon>
            </div>
          </n-popselect>
        </div>
        <input
          class="input w-40"
          v-model="newData.bz"
          type="text"
          placeholder="请输入内容描述"
        />
        <div
          class="w-32 pl-4 cursor-pointer underline text-green-700"
          @click="addNewShootDetailClick"
        >
          添加
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: SLContent
 * description:
 * author: roct
 * date: 10:41 下午 2021/9/4
 */
import { defineProps, ref, watch, Ref, watchEffect, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
import { CaretDownSharp } from '@vicons/ionicons5'
import { VueDraggableNext } from 'vue-draggable-next'
import {
  getShootDetail,
  saveShootDetail,
  updateShootDetail,
  deleteShootDetail
} from '@/api/shootDetailApi'
import { ShootDetailType } from '@/api/apiType'
import {
  jwOptions,
  jbOptions,
  jtOptions,
  dsqxOptions,
  hmgtOptions
} from '@/pages/ShootList/components/ContentOptions'
import { generateUUID } from '@/utils/uuid'

interface Props {
  name: string
  shootId: string
}
const props = defineProps<Props>()
const loading = ref(false)
const message = useMessage()
const data: Ref<ShootDetailType[]> = ref([])
const newData: Ref<ShootDetailType> = ref({
  id: '',
  shootId: '',
  cc: '',
  jh: '',
  nrms: '',
  jb: '',
  jwyd: '',
  bz: '',
  jtlx: '',
  jtgd: '',
  hmgt: '',
  dsqx: ''
})
watchEffect(() => {
  nextTick(() => {
    loadShootDetailList(props.shootId)
  })
})

watch(
  () => props.shootId,
  () => {
    loadShootDetailList(props.shootId)
  }
)

const updateRequest = async () => {
  try {
    await updateShootDetail(data.value)
    await getShootDetail(props.shootId)
  } catch (e) {
    message.error('保存失败')
  }
}
/**
 * @Author roct
 * @Description 获取分镜头下的详细信息
 * @Date 6:36 下午 2021/9/5
 **/
const loadShootDetailList = async (shootId: string) => {
  loading.value = true
  data.value = await getShootDetail(shootId)
  setTimeout(() => {
    loading.value = false
  }, 800)
}
/**
 * @Author roct
 * @Description 给目前的分镜头添加一个信息
 * @Date 6:37 下午 2021/9/5
 **/
const addNewShootDetailClick = async () => {
  try {
    newData.value.id = generateUUID()
    newData.value.shootId = props.shootId
    if (
      !newData.value.id ||
      !newData.value.shootId ||
      !newData.value.jh ||
      !newData.value.nrms ||
      !newData.value.jb ||
      !newData.value.jwyd
    ) {
      message.error('请填写完整分镜头')
      return
    }
    await saveShootDetail(newData.value)
    newData.value = {
      id: '',
      shootId: '',
      cc: '',
      jh: '',
      nrms: '',
      jb: '',
      jwyd: '',
      bz: '',
      jtlx: '',
      jtgd: '',
      dsqx: '',
      hmgt: ''
    }
    await loadShootDetailList(props.shootId)
  } catch (e) {
    message.error('保存失败')
  }
}
/***
 * @Author roct
 * @Description 删除
 * @Date 6:52 下午 2021/9/5
 **/
const deleteShootDetailClick = async (item: ShootDetailType) => {
  try {
    await deleteShootDetail(item)
    message.success('删除成功')
    await loadShootDetailList(props.shootId)
  } catch (e) {
    message.error('删除失败')
  }
}
const resetJt = (item: ShootDetailType) => {
  item.hmgt = ''
  item.dsqx = ''
  item.jtgd = ''
  updateRequest()
}
const draggableEnd = () => {
  updateRequest()
}
</script>
<style scoped lang="scss">
.input {
  outline: none;
  background: transparent;
  resize: none;
  @apply p-2.5;
  &:hover {
    @apply border-gray-300;
    @apply border;
    @apply border-solid;
  }
}
</style>
