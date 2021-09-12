<template>
  <div>
    <div
      class="
        w-full
        h-16
        border-b border-solid border-gray-100
        flex
        items-center
        px-10
        justify-between
      "
    >
      <n-breadcrumb>
        <n-breadcrumb-item> 团队管理 </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="sl-content flex-col p-5">
      <div class="flex items-center justify-between">
        <n-input-group>
          <n-input v-model:value="searchValue" :style="{ width: '300px' }" />
          <n-button type="default" @click="searchClick">搜索</n-button>
          <n-button type="default" @click="clearSearchClick">清空</n-button>
        </n-input-group>
        <n-button type="default" ghost @click="addClick">添加</n-button>
      </div>
      <n-data-table
        class="mt-10"
        :columns="columns"
        :data="data"
        :pagination="pagination"
      />
      <n-modal v-model:show="showModal" preset="dialog" title="添加员工">
        <div>
          <n-input-group class="mt-5">
            <div
              style="height: 34px; width: 50px"
              class="
                flex-shrink-0
                h-full
                leading-none
                flex
                items-center
                justify-center
                mr-4
              "
            >
              员工名:
            </div>
            <n-input v-model:value="newUser.name" placeholder="输入员工名字" />
          </n-input-group>
          <n-input-group class="mt-5">
            <div
              style="height: 34px; width: 50px"
              class="
                flex-shrink-0
                h-full
                leading-none
                flex
                items-center
                justify-center
                mr-4
              "
            >
              年龄:
            </div>
            <n-input v-model:value="newUser.age" placeholder="输入员工年龄" />
          </n-input-group>
          <n-input-group class="mt-5">
            <div
              style="height: 34px; width: 50px"
              class="
                flex-shrink-0
                h-full
                leading-none
                flex
                items-center
                justify-center
                mr-4
              "
            >
              地址:
            </div>
            <n-input
              v-model:value="newUser.address"
              placeholder="输入员工地址"
            />
          </n-input-group>
          <n-input-group class="mt-5">
            <div
              style="height: 34px; width: 50px"
              class="
                flex-shrink-0
                h-full
                leading-none
                flex
                items-center
                justify-center
                mr-4
              "
            >
              印象:
            </div>
            <n-input v-model:value="newUser.tags" placeholder="输入员工印象" />
          </n-input-group>

          <n-input-group>
            <div
              style="width: 50px"
              class="
                flex-shrink-0
                h-full
                leading-none
                flex
                items-center
                justify-center
                mr-4
              "
            ></div>
            <div class="text-gray-300 text-sm">
              要输入多个印象可用逗号分割. 比如:1,2
            </div>
          </n-input-group>
        </div>
        <template #action>
          <n-button @click.stop="showModal = false">取消</n-button>
          <n-button @click.stop="addNewUsersClick">确定</n-button>
        </template>
      </n-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Team
 * description:
 * author: roct
 * date: 9:50 下午 2021/8/31
 */
import { ref, h, Ref, reactive, onMounted } from 'vue'
import { getUserList, saveUserList } from '@/api/teamApi'
import { User } from '@/api/apiType'
import { generateUUID } from '@/utils/uuid'
import { NTag, NButton } from 'naive-ui'
// 搜索关键字
const searchValue = ref('')
// 是否展示modal
const showModal = ref(false)
// 表格数据源
const data: Ref<User[]> = ref([])
const newUser: User = reactive({
  name: '',
  age: '',
  address: '',
  tags: []
})
const createColumns = ({ deleteClick }) => {
  return [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    },
    {
      title: '地址',
      key: 'address'
    },
    {
      title: '印象',
      key: 'tags',
      render(row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'warning'
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            style: {
              marginRight: '6px'
            },
            type: 'default',
            onClick: () => deleteClick(row)
          },
          {
            default: () => '删除'
          }
        )
      }
    }
  ]
}
const columns = createColumns({
  deleteClick(rowData) {
    const idx = data.value.findIndex((item: User) => item.key === rowData.key)
    if (idx > -1) {
      data.value.splice(idx, 1)
      saveUsers()
    }
  }
})

const pagination = {
  pageSize: 10
}

const searchClick = () => {
  const item = data.value.find((item: any) => item.name === searchValue.value)
  data.value = [item]
}
const clearSearchClick = () => {
  getUsers()
}
/**
 * @Author roct
 * @Description 点击添加按钮
 * @Date 8:15 下午 2021/9/12
 **/
const addClick = () => {
  showModal.value = !showModal.value
}
/**
 * @Author roct
 * @Description 获取数据
 * @Date 8:26 下午 2021/9/12
 **/
const getUsers = () => {
  data.value = getUserList()
  console.log('data.value', data.value)
}
/**
 * @Author roct
 * @Description 保存数据
 * @Date 8:26 下午 2021/9/12
 **/
const saveUsers = () => {
  saveUserList(data.value)
}
onMounted(() => {
  getUsers()
})
/**
 * @Author roct
 * @Description 点击modal的保存按钮
 * @Date 8:15 下午 2021/9/12
 **/
const addNewUsersClick = () => {
  if (!newUser.name || !newUser.age || !newUser.address) {
    return
  }
  showModal.value = !showModal.value
  const user = JSON.parse(JSON.stringify(newUser))
  user.key = generateUUID()
  user.tags = user.tags.split(',')
  data.value.push(user)
  newUser.name = ''
  newUser.age = ''
  newUser.address = ''
  newUser.tags = []
  saveUsers()
}
</script>
<style scoped lang="scss"></style>
