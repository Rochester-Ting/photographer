<template>
  <div class="w-full h-56 bg-gray-100 rounded overflow-hidden flex relative">
    <n-image
      class="flex-shrink-0 h-56 flex-shrink-0"
      :src="cover"
    />
    <div class="ml-10">
      <div v-if="!editStatus" class="pt-4 text-3xl text-gray-700">
        {{ nameRef }}
      </div>
      <input
        v-else
        v-model="nameRef"
        class="mt-4 text-3xl text-gray-700 input-name text-3xl"
      />
      <div class="pt-2 text-base text-gray-500 desc-content">
        <div v-if="!editStatus">{{ value }}</div>
        <textarea v-else v-model="value" class="textarea" placeholder="单击此处添加项目备注" />
      </div>
    </div>
    <div class="absolute right-10 top-4">
      <n-button @click="editProjectInfo">
        {{ editStatus ? '保存' : '编辑' }}
      </n-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: DetailHeader
 * description:
 * author: roct
 * date: 1:11 下午 2021/9/4
 */
import { ref, watch, watchEffect, defineProps, defineEmits } from 'vue'
import cover from '@/assets/cover.jpg'
interface Props {
  id: string
  name?: string
  desc?: string
}
const props = defineProps<Props>()
const value = ref('')
const nameRef = ref('')
const emit = defineEmits(['update:desc', 'update:name', 'save'])
watchEffect(() => {
  value.value = props.desc || ''
  nameRef.value = props.name || ''
})
watch(
  () => value.value,
  () => {
    emit('update:desc', value.value)
  }
)
watch(
  () => nameRef.value,
  () => {
    emit('update:name', nameRef.value)
  }
)
const editStatus = ref(false)
/**
 * @Author roct
 * @Description 编辑项目信息
 * @Date 1:18 下午 2021/9/4
 **/
const editProjectInfo = () => {
  editStatus.value = !editStatus.value
  if (!editStatus.value) {
    emit('save')
  }
}
</script>
<style scoped lang="scss">
.desc-content {
  :deep(.n-input-wrapper) {
    width: 500px;
    height: 140px;
  }
}
.textarea {
  width: 500px;
  height: 140px;
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
.input-name {
  width: 500px;
  height: 44px;
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
