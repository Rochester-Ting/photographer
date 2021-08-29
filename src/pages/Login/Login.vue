<template>
  <div class="login-wrapper flex items-center justify-center">
    <div class="login-content-wrapper bg-white flex flex-col items-center">
      <div class="mt-6 text-2xl">欢迎使用</div>
      <div class="mt-1 text-2xl">WonderWrap</div>
      <div class="login-content-desc">
        <span>中国短视频工业化先驱，打造智能、便捷、高</span>
        <span> 效的工作流</span>
      </div>
      <n-form
        class="login-content-desc mt-10"
        label-placement="left"
        :model="formValue"
        :rules="rules"
        size="medium"
        ref="formRef"
      >
        <n-form-item inline label="账号" path="username">
          <n-input v-model:value="formValue.username" placeholder="输入账号" />
        </n-form-item>
        <n-form-item class="mt-3" label="密码" path="password">
          <n-input
            type="password"
            placeholder="输入密码"
            v-model:value="formValue.password"
          />
        </n-form-item>
        <n-form-item>
          <n-button
            class="login-submit-btn mt-4"
            type="primary"
            @click="handleValidateClick"
            attr-type="button"
            :loading="loading"
          >
            登录
          </n-button>
        </n-form-item>
        <div
          class="
            text-gray-300 text-base
            cursor-pointer
            underline
            w-full
            flex
            justify-between
          "
        >
          <span>忘记密码？</span>
          <span>免费注册账号</span>
        </div>
      </n-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Login
 * description:
 * author: roct
 * date: 2:17 下午 2021/8/28
 */
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
// 信息提示
const message = useMessage()
// 路由
const router = useRouter()
// 创建form的dom
const formRef: Ref<HTMLFormElement | null> = ref(null)
// 创建数据结构
const formValue = ref({
  username: '',
  password: ''
})
// loading
const loading = ref(false)
// 创建form参数规则
const rules = {
  username: {
    required: true,
    message: '请输入账号',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  }
}
/**
 * @Author roct
 * @Description 点击登录
 * @Date 10:01 下午 2021/8/29
 **/
const handleValidateClick = () => {
  if (loading.value) {
    return
  }
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      checkLogin(
        formValue.value.username === 'admin' &&
          formValue.value.password === 'admin'
      )
    } else {
      message.error('请输入账号/密码')
    }
  })
}
/**
 * @Author roct
 * @Description 校验登录逻辑
 * @Date 10:19 下午 2021/8/29
 **/
const checkLogin = (state: boolean) => {
  loading.value = true
  setTimeout(
    () => {
      loading.value = false
      if (state) {
        router.push({
          name: 'Home'
        })
      } else {
        message.error('账号/密码错误')
      }
    },
    state ? 1000 : 1000
  )
}
</script>
<style scoped lang="scss">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/login/loginbg_gaitubao.jpg') no-repeat;
  background-size: 100% 100%;
  .login-content-wrapper {
    width: 600px;
    height: 500px;
    border-radius: 10px;
    .login-content-desc {
      width: 360px;
      @apply mt-3;
      @apply text-base;
      @apply text-gray-400;
      @apply flex;
      @apply flex-col;
      @apply items-center;
      @apply justify-center;
      :deep(.n-form-item) {
        width: 100%;
      }
    }
    .login-submit-btn {
      width: 360px;
    }
  }
}
</style>
