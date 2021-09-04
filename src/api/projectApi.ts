import { ProjectItemType } from '@/api/apiType'

/***
 * @Author roct
 * @Description 获取所有项目组
 * @Date 9:00 下午 2021/9/3
 **/
export const getProjectList = (id: string) => {
  const list = localStorage.getItem('project_list_' + id)
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
export const saveProjectList = (
  id: string | number,
  projectList: ProjectItemType[] = []
) => {
  localStorage.setItem('project_list_' + id, JSON.stringify(projectList))
  return Promise.resolve()
}

/***
 * @Author roct
 * @Description 删除某个项目组
 * @Date 9:31 下午 2021/9/3
 **/
export const deleteProjectList = async (
  id: string,
  project: ProjectItemType
) => {
  const list = await getProjectList(id)
  if (list.length > 0) {
    const index = list.findIndex((target: ProjectItemType) => {
      return project.id === target.id
    })
    if (index >= 0) {
      list.splice(index, 1)
      await saveProjectList(id, list)
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
export const updateProjectList = async (
  id: string,
  project: ProjectItemType
) => {
  const list = await getProjectList(id)
  if (list.length > 0) {
    const index = list.findIndex((target: ProjectItemType) => {
      return project.id === target.id
    })
    if (index >= 0) {
      list[index] = project
      await saveProjectList(id, list)
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
  return Promise.reject()
}
/**
 * @Author roct
 * @Description 获取单个项目的信息
 * @Date 1:47 下午 2021/9/4
 **/
export const getProjectInfo = async (id: string, parentId: string) => {
  // 获取列表
  const list = await getProjectList(parentId)
  // 获取单个项目的信息
  const project = list.find((item: ProjectItemType) => {
    return item.id === id
  })
  if (project) {
    return Promise.resolve(project)
  } else {
    return Promise.reject()
  }
}
/**
 * @Author roct
 * @Description 保存单个项目的信息
 * @Date 1:47 下午 2021/9/4
 **/
export const saveProjectInfo = async (
  parentId: string,
  project: ProjectItemType
) => {
  // 获取列表
  const list = await getProjectList(parentId)
  console.log('list', list, project.id)
  // 获取单个项目的信息
  const index = list.findIndex((item: ProjectItemType) => {
    return item.id === project.id
  })
  if (index > -1) {
    list[index] = project
    await saveProjectList(parentId, list)
    return Promise.resolve()
  } else {
    return Promise.reject()
  }
}
