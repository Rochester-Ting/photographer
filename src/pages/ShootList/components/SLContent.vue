<template>
  <n-spin :show="loading">
    <div class="p-10 pt-5 flex-auto">
      <div class="text-3xl pb-5">{{ props.name }}</div>
      <div>
        <div class="flex items-center h-10 bg-gray-50 text-gray-500 text-sm">
          <span class="w-20 pl-4">场次</span>
          <span class="w-20 pl-4">镜号</span>
          <span class="flex-auto pl-4">内容描述</span>
          <span class="w-32 pl-4">景别</span>
          <span class="w-32 pl-4">镜头类型</span>
          <span class="w-40 pl-4">机位运动</span>
          <span class="w-40 pl-4">备注</span>
          <span class="w-32 pl-4">操作</span>
        </div>
        <div
          class="flex items-center h-10 text-gray-500 text-sm text-gray-500"
          v-for="(item, index) of data"
          :key="index"
        >
          <span class="w-20 pl-4">{{ item.cc }}</span>
          <span class="w-20 pl-4">{{ item.jh }}</span>
          <span class="flex-auto pl-4">{{ item.nrms }}</span>
          <span class="w-32 pl-4">{{ item.jb }}</span>
          <span class="w-32 pl-4">{{ item.jtlx }}</span>
          <span class="w-40 pl-4">{{ item.jwyd }}</span>
          <span class="w-40 pl-4">{{ item.bz }}</span>
          <span
            class="w-32 pl-4 cursor-pointer underline text-red-700"
            @click="deleteShootDetailClick(item)"
          >
            删除
          </span>
        </div>
        <div class="flex items-center h-10 text-gray-500 text-sm text-gray-500">
          <input
            class="input w-20 h-10"
            v-model="newData.cc"
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
          <div class="w-32 pl-4">
            <n-popselect
              :options="jtOptions"
              v-model:value="newData.jtlx"
              trigger="click"
              scrollable
            >
              <div class="flex items-center cursor-pointer">
                {{ newData.jtlx || '镜头类型' }}
                <n-icon>
                  <CaretDownSharp />
                </n-icon>
              </div>
            </n-popselect>
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
  </n-spin>
</template>
<script lang="ts" setup>
/**
 * name: SLContent
 * description:
 * author: roct
 * date: 10:41 下午 2021/9/4
 */
import { defineProps, ref, watch, Ref, watchEffect, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { CaretDownSharp } from '@vicons/ionicons5'
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
  jtOptions
} from '@/pages/ShootList/components/ContentOptions'
import { generateUUID } from '@/utils/uuid'

interface Props {
  name: string
  shootId: string
}
const props = defineProps<Props>()
const loading = ref(false)
const message = useMessage()
const data: Ref<ShootDetailType> = ref([])
const newData: Ref<ShootDetailType> = ref({
  id: '',
  shootId: '',
  cc: '',
  jh: '',
  nrms: '',
  jb: '',
  jwyd: '',
  bz: ''
})
watchEffect(() => {
  console.log('Loading', props.shootId)
  loadShootDetailList(props.shootId)
})
onMounted(() => {
  loadShootDetailList(props.shootId)
})
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
      !newData.value.cc ||
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
      bz: ''
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
