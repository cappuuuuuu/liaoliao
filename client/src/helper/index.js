import moment from 'moment'
import 'moment/locale/zh-tw'

export function getTime () {
  return moment().locale('zh-tw')
}

export function getConfigsJSON () {
  try {
    return require('@/configs/index.json')
  } catch (error) {
    return { SERVER_ORIGIN: process.env.SERVER_ORIGIN }
  }
}
