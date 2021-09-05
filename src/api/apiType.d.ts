/**
 * @Author roct
 * @Description 项目组数据结构
 * @Date 9:06 下午 2021/9/3
 **/
export type ProjectItemGroupType = {
  id: string | number
  name: string
}
/**
 * @Author roct
 * @Description 项目的数据结构
 * @Date 9:06 下午 2021/9/3
 **/
export interface ProjectItemType {
  id: string | number
  name: string
  desc: string
}
/**
 * @Author roct
 * @Description 分镜头的侧边
 * @Date 9:06 下午 2021/9/3
 **/
export interface ShootType {
  id: string
  name: string
  projectId: string
}
/**
 * @Author roct
 * @Description 分镜头列表详情
 * @Date 5:46 下午 2021/9/5
 **/
export interface ShootDetailType {
  id: string
  shootId: string
  cc: string
  jh: string
  nrms: string
  jb: string
  jtlx: string
  jwyd: string
  bz: string
}
