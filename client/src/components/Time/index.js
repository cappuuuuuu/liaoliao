const moment = require('moment')
require('moment/locale/zh-tw')

const getTime = () => {
  return moment().locale('zh-tw')
}

module.exports = { getTime }
