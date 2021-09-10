<template>
  <div class="p-10 pt-5 flex-auto w-full">
    <div
      class="
        bg-gradient-to-t
        from-gray-100
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
        class="w-custom mt-5"
        type="text"
        placeholder="输入标题"
      />
      <div
        class="mt-5 text-gray-500 text-gray-500 text-sm mb-2 flex items-center"
      >
        <n-icon class="mr-1"> <StopwatchOutline /> </n-icon>拍摄时间
      </div>
      <n-input
        size="medium"
        class="w-custom"
        type="text"
        placeholder="拍摄时间"
      />
      <div class="mt-5 text-gray-500 text-sm mb-2 flex items-center">
        <n-icon class="mr-1">
          <LocationOutline />
        </n-icon>
        拍摄地址
      </div>
      <n-input
        size="medium"
        class="w-custom"
        type="text"
        placeholder="输入地址"
      />
      <n-input
        size="medium"
        class="w-custom mt-5"
        type="text"
        placeholder="输入备注(可选)"
      />
      <n-input
        size="medium"
        class="w-custom mt-5"
        type="text"
        placeholder="内容描述"
      />
      <n-input
        size="medium"
        class="w-custom mt-5"
        type="text"
        placeholder="内容描述"
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
          <span class="w-20">预估耗时</span>
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
        >
          <span class="w-20">{{ props.name }}</span>
          <span class="w-28 cursor-pointer">
            内景/外景
            <n-icon>
              <CaretDownSharp />
            </n-icon>
          </span>
          <span class="w-28 cursor-pointer">
            日景/夜景
            <n-icon>
              <CaretDownSharp />
            </n-icon>
          </span>
          <span class="flex-auto">内容简述</span>
          <span class="w-20">备注</span>
          <span class="w-20">预估耗时</span>
          <span class="w-14 cursor-pointer underline text-red-700"> 删除 </span>
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
          <span class="w-20"> 1.5小时 </span>
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
          <span class="w-20">{{ props.name }}</span>
          <span class="w-28 cursor-pointer">
            内景/外景
            <n-icon>
              <CaretDownSharp />
            </n-icon>
          </span>
          <span style="width: 100px" class="w-28 cursor-pointer">
            日景/夜景
            <n-icon>
              <CaretDownSharp />
            </n-icon>
          </span>
          <input class="hidden-input flex-auto" placeholder="内容简述" />
          <input class="hidden-input w-20" placeholder="备注" />
          <input class="hidden-input w-20" type="number" placeholder="耗时" />
          <span class="w-14 cursor-pointer underline text-green-700">
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
import { defineProps } from 'vue'
import { useMessage } from 'naive-ui'
interface Props {
  id: string
  name: string
}
const props = defineProps<Props>()
const message = useMessage()
</script>
<style scoped lang="scss">
//.input {
//  outline: none;
//  background: transparent;
//  //resize: none;
//  border-radius: 5px;
//  @apply border-gray-300;
//  @apply border;
//  @apply border-solid;
//  text-align: center;
//  &:hover {
//    @apply border-gray-300;
//    @apply border;
//    @apply border-solid;
//  }
//}
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
</style>
