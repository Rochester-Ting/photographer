import { User } from './apiType'

export const getUserList = () => {
  const users = localStorage.getItem('users')
  if (users) {
    return JSON.parse(users)
  }
  return []
}

export const saveUserList = (userList: User[]) => {
  const str = JSON.stringify(userList)
  localStorage.setItem('users', str)
}
