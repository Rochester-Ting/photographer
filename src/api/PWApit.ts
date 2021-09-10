import { PWType } from '@/api/apiType'

/**
 * @Author roct
 * @Description 获取数组其他数据
 * @Date 10:33 下午 2021/9/4
 **/
const getOtherList = (projectId: string) => {
  const allList = localStorage.getItem('PWList')
  if (allList) {
    const listArr = JSON.parse(allList)
    return (
      listArr.filter((target: PWType) => {
        return target.projectId !== projectId
      }) || []
    )
  }
  return []
}
/**
 * @Author roct
 * @Description 获取分镜头列表
 * @Date 1:47 下午 2021/9/4
 **/
export const getPWList = (projectId: string) => {
  const list = localStorage.getItem('PWList')
  if (list) {
    const listArr = JSON.parse(list)
    const idList = listArr.filter((target: PWType) => {
      return target.projectId === projectId
    })
    if (idList) {
      return Promise.resolve(idList)
    }
  }
  return Promise.resolve([])
}
/**
 * @Author roct
 * @Description 保存分镜头列表
 * @Date 1:47 下午 2021/9/4
 **/
export const updatePWList = async (item: PWType) => {
  if (item.id && item.projectId) {
    const list: PWType[] = await getPWList(item.projectId)
    const index = list.findIndex(
      (target: PWType) =>
        item.id === target.id && target.projectId === item.projectId
    )
    if (index === -1) {
      list.push(item)
    } else {
      list[index] = item
    }
    const otherList = getOtherList(item.projectId)
    localStorage.setItem('PWList', JSON.stringify(otherList.concat(list)))
    return Promise.resolve()
  } else {
    return Promise.reject()
  }
}
/**
 * @Author roct
 * @Description 保存分镜头列表, 保存整个列表
 * @Date 1:47 下午 2021/9/4
 **/
export const updateSorted = async (items: PWType[], projectId: string) => {
  const otherList = getOtherList(projectId)
  localStorage.setItem('PWList', JSON.stringify(otherList.concat(items)))
  return Promise.resolve()
}
/**
 * @Author roct
 * @Description 删除分镜头列表
 * @Date 1:47 下午 2021/9/4
 **/
export const deletePWList = async (item: PWType) => {
  if (item.id && item.projectId) {
    const list = await getPWList(item.projectId)
    const index = list.findIndex((target: PWType) => item.id === target.id)
    if (index > -1) {
      list.splice(index, 1)
      const otherList = getOtherList(item.projectId)
      localStorage.setItem('PWList', JSON.stringify(otherList.concat(list)))
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  } else {
    return Promise.reject()
  }
}
