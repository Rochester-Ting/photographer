import { ShootType } from '@/api/apiType'

/**
 * @Author roct
 * @Description 获取分镜头列表
 * @Date 1:47 下午 2021/9/4
 **/
export const getShootList = (projectId: string) => {
  const list = localStorage.getItem('shootList')
  if (list) {
    const listArr = JSON.parse(list)
    const idList = listArr.filter((target: ShootType) => {
      return target.projectId === projectId
    })
    return Promise.resolve(JSON.parse(idList))
  }
  return Promise.resolve([])
}
/**
 * @Author roct
 * @Description 保存分镜头列表
 * @Date 1:47 下午 2021/9/4
 **/
export const updateShootList = async (item: ShootType) => {
  if (item.id) {
    const list = await getShootList(item.id)
    const index = list.findIndex(
      (target: ShootType) =>
        item.id === target.id && target.projectId === item.projectId
    )
    if (index > -1) {
      list[index] = item
    } else {
      list.push(item)
    }
    localStorage.setItem('shootList', JSON.stringify(list))
    return Promise.resolve()
  } else {
    return Promise.reject()
  }
}
/**
 * @Author roct
 * @Description 保存分镜头列表
 * @Date 1:47 下午 2021/9/4
 **/
export const deleteShootList = async (item: ShootType) => {
  if (item.id) {
    const list = await getShootList(item.id)
    const index = list.findIndex((target: ShootType) => item.id === target.id)
    if (index > -1) {
      list.splice(index, 1)
      localStorage.setItem('shootList', JSON.stringify(list))
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  } else {
    return Promise.reject()
  }
}
