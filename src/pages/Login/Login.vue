<template>
  <div class="login-wrapper flex items-center justify-center">
    <div class="login-content-wrapper bg-white flex flex-col items-center">
      <div class="mt-6 text-2xl">欢迎使用</div>
      <div class="mt-1 text-2xl">WonderWrap</div>
      <div
        class="
          login-content-desc
          mt-3
          text-base text-gray-400
          flex flex-col
          items-center
          justify-center
        "
      >
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
          <n-input placeholder="输入密码" v-model:value="formValue.password" />
        </n-form-item>
        <div class="text-gray-300 underline">忘记密码？</div>
        <n-form-item>
          <n-button
            class="login-content-desc mt-4"
            type="primary"
            @click="handleValidateClick"
            attr-type="button"
          >
            登录
          </n-button>
        </n-form-item>

        <div class="text-gray-300 text-lg underline w-full flex justify-center">
          免费注册账号
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
const formRef: Ref<HTMLFormElement | null> = ref(null)
const formValue = ref({
  username: '',
  password: ''
})
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
const handleValidateClick = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      console.log('Valid')
    } else {
      console.log(errors)
      console.log('Invalid')
    }
  })
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
    }
  }
}
</style>
