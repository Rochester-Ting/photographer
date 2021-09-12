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
  jtgd: string
  hmgt: string
  dsqx: string
}

/**
 * @Author roct
 * @Description 项目统筹列表的类型
 * @Date 8:27 下午 2021/9/5
 **/
export interface PWType {
  id: string
  name: string
  projectId: string
}
/**
 * @Author roct
 * @Description 项目统筹列表详情的类型
 * @Date 8:27 下午 2021/9/5
 **/
export interface PWDetailType {
  id: string
  name: string
  PWId: string
  cj: {
    cjlx: string
    cjsj: string
    cjcs: string
    cjjs: string
  }
  dj: { name: string; list: string[] }[]
  // yy?: string[]
  // qy?: string[]
  // dd?: string[]
  // cl?: string[]
  // dj?: string[]
  // hqtx?: string[]
  // hz?: string[]
  // dw?: string[]
  // py?: string[]
  // ly?: string[]
  // bj?: string[]
  // tssb?: string[]
  // ab?: string[]
  // ewll?: string[]
  // sjxg?: string[]
  // zx?: string[]
}

export interface TGType {
  id: string
  name: string
  projectId: string
}
// 拍摄顺序
export interface PssxType {
  nwj: string
  ryj: string
  description: string
  remark: string
  yghs: string
}
// 演职人员
export interface YzryType {
  name: string
  zw: string
  dcsj: number | null
  nrms: string
  remark: string
}
// 通告详情
export interface TGDetailType {
  title: string // 标题
  time: string | number // 拍摄时间
  address: string // 拍摄地址
  remark?: string // 备注
  description: string // 内容描述
  pssx: PssxType[]
  yzry: YzryType[]
}

// 单个员工的信息
export interface User {
  key: string | number
  name: string
  age: string | number
  address: string
  tags: string[] | string
}
