import moment from 'moment'
import 'moment/locale/zh-tw'

export function getTime () {
  return moment().locale('zh-tw')
}

export function momentFormatDate (time) {
  return moment(time).format('ll')
}

export function momentFormatTime (time) {
  // Time (without seconds) ex: 19:20
  return moment(time).format('LT')
}

export function getConfigsJSON () {
  try {
    return require('@/configs/index.json')
  } catch (error) {
    return { SERVER_ORIGIN: process.env.SERVER_ORIGIN }
  }
}

export function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
