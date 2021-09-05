/**
 * @Author roct
 * @Description 根据镜头的id, 获取镜头的详细信息
 * @Date 5:38 下午 2021/9/5
 * @params id: 镜头的id
 **/
import { ShootDetailType } from '@/api/apiType'
/***
 * @Author roct
 * @Description 获取ShootDetailList列表
 * @Date 6:18 下午 2021/9/5
 **/
export const getShootDetail = (shootId: string) => {
  const list = localStorage.getItem('shootDetail')
  if (list) {
    const listArray = JSON.parse(list)
    return Promise.resolve(
      listArray.filter((target: ShootDetailType) => {
        return shootId === target.shootId
      }) || []
    )
  } else {
    return Promise.resolve([])
  }
}
/***
 * @Author roct
 * @Description 保存ShootDetailList
 * @Date 6:19 下午 2021/9/5
 **/
export const saveShootDetail = async (shootDetail: ShootDetailType) => {
  const list = localStorage.getItem('shootDetail') || JSON.stringify([])
  const listArray = JSON.parse(list)
  listArray.push(shootDetail)
  localStorage.setItem('shootDetail', JSON.stringify(listArray))
  return Promise.resolve()
}
/**
 * @Author roct
 * @Description 保存修改某一个, 保存整个对应的数组
 * @Date 6:24 下午 2021/9/5
 **/
export const updateShootDetail = async (shootDetailList: ShootDetailType[]) => {
  const list = getOtherList(shootDetailList[0].shootId).concat(shootDetailList)
  localStorage.setItem('shootDetail', JSON.stringify(list))
  return Promise.resolve()
}

/**
 * @Author roct
 * @Description 删除某一个
 * @Date 6:24 下午 2021/9/5
 **/
export const deleteShootDetail = async (shootDetail: ShootDetailType) => {
  const list = localStorage.getItem('shootDetail') || JSON.stringify([])
  const l = JSON.parse(list)
  const index = l.findIndex((target: ShootDetailType) => {
    return target.id === shootDetail.id
  })
  if (index === -1) {
    return Promise.reject()
  }
  l.splice(index, 1)
  localStorage.setItem('shootDetail', JSON.stringify(l))
  return Promise.resolve()
}

const getOtherList = (shootId: string) => {
  const list = localStorage.getItem('shootDetail') || JSON.stringify([])
  const listArray = JSON.parse(list)
  return listArray.filter((target: ShootDetailType) => {
    return shootId !== target.shootId
  })
}
