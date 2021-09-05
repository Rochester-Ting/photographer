/**
 * @Author roct
 * @Description 根据镜头的id, 获取镜头的详细信息
 * @Date 5:38 下午 2021/9/5
 * @params id: 镜头的id
 **/
import { PWDetailType } from '@/api/apiType'
/***
 * @Author roct
 * @Description 获取PWDetailInfo列表
 * @Date 6:18 下午 2021/9/5
 **/
export const getPWDetailInfo = (PWId: string) => {
  const list = localStorage.getItem('PWDetailInfo')
  let pw: PWDetailType | undefined = undefined
  if (list) {
    const listArray = JSON.parse(list)
    pw = listArray.find((target: PWDetailType) => {
      return PWId === target.PWId
    })
  }
  if (!pw) {
    pw = {
      id: '',
      name: '',
      PWId: '',
      cj: {
        cjlx: '',
        cjsj: '',
        cjcs: '',
        cjjs: ''
      },
      dj: []
    }
  }
  return Promise.resolve(pw)
}
/***
 * @Author roct
 * @Description 保存PWDetailInfo
 * @Date 6:19 下午 2021/9/5
 **/
export const savePWDetail = async (PWDetail: PWDetailType) => {
  const list = localStorage.getItem('PWDetailInfo') || JSON.stringify([])
  const listArray = JSON.parse(list)
  const index = listArray.findIndex((target: PWDetailType) => {
    return PWDetail.PWId === target.PWId
  })
  if (index > -1) {
    listArray[index] = PWDetail
  } else {
    listArray.push(PWDetail)
  }
  localStorage.setItem('PWDetailInfo', JSON.stringify(listArray))
  return Promise.resolve()
}
