import { ProjectItemGroupType } from './apiType'
/***
 * @Author roct
 * @Description 获取所有项目组
 * @Date 9:00 下午 2021/9/3
 **/
export const getAllProjectGroup = () => {
  const list = localStorage.getItem('allProjectGroup')
  if (list) {
    return Promise.resolve(JSON.parse(list))
  } else {
    return Promise.resolve([])
  }
}
/***
 * @Author roct
 * @Description 保存所有项目组
 * @Date 9:01 下午 2021/9/3
 **/
export const saveAllProjectGroup = (project: ProjectItemGroupType[] = []) => {
  setTimeout(() => {
    localStorage.setItem('allProjectGroup', JSON.stringify(project))
    return Promise.resolve()
  }, 800)
}

/***
 * @Author roct
 * @Description 删除某个项目组
 * @Date 9:31 下午 2021/9/3
 **/
export const deleteProjectGroup = async (project: ProjectItemGroupType) => {
  const list = await getAllProjectGroup()
  if (list.length > 0) {
    const index = list.findIndex((target: ProjectItemGroupType) => {
      return project.id === target.id
    })
    if (index >= 0) {
      list.splice(index, 1)
      saveAllProjectGroup(list)
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
  return Promise.reject()
}

/***
 * @Author roct
 * @Description 更新某个项目组的名字
 * @Date 9:31 下午 2021/9/3
 **/
export const updateProjectGroup = async (project: ProjectItemGroupType) => {
  const list = await getAllProjectGroup()
  if (list.length > 0) {
    const index = list.findIndex((target: ProjectItemGroupType) => {
      return project.id === target.id
    })
    if (index >= 0) {
      list[index] = project
      saveAllProjectGroup(list)
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
  return Promise.reject()
}
