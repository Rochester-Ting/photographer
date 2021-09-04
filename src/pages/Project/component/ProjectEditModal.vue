<template>
  <n-modal
    :show="props.showModal"
    :show-icon="false"
    preset="dialog"
    title="Dialog"
  >
    <template #header>
      <div>提示</div>
    </template>
    <div>
      <n-input v-model:value="val" :placeholder="props.placeholder" />
    </div>
    <template #action>
      <div>
        <n-button class="mr-4" @click="cancelClick"> 取消 </n-button>
        <n-button type="error" @click="confirmClick"> 确定 </n-button>
      </div>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
/**
 * name: ProjectEditModal
 * description:
 * author: roct
 * date: 12:31 下午 2021/9/4
 */
interface Props {
  showModal: boolean
  inputVal: string
  placeholder: string
}

import { defineProps, defineEmits, ref, watchEffect } from 'vue'
import { useMessage } from 'naive-ui'
const message = useMessage()
const props = defineProps<Props>()

const emit = defineEmits(['cancelClick', 'confirmClick', 'update:inputVal'])

const val = ref('')
watchEffect(() => {
  val.value = props.inputVal
})
const cancelClick = () => {
  console.log('cancelClick')
  emit('cancelClick')
}
const confirmClick = () => {
  if (!val.value) {
    message.error('请输入内容')
    return
  }
  emit('update:inputVal', val.value)
  setTimeout(() => {
    emit('confirmClick')
  }, 300)
}
</script>
<style scoped lang="scss"></style>
