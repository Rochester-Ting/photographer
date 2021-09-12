import { TGDetailType } from '@/api/apiType'

export const saveTGDetail = (id: string, detailList: TGDetailType) => {
  try {
    const list = JSON.stringify(detailList)
    localStorage.setItem('tg_detail:' + id, list)
    return Promise.resolve()
  } catch (e) {
    return Promise.reject()
  }
}

export const getTGDetail = (id: string) => {
  const obj = localStorage.getItem('tg_detail:' + id)
  if (obj) {
    return Promise.resolve(JSON.parse(obj))
  } else {
    return Promise.resolve(null)
  }
}
