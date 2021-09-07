import axios from 'axios'
import { getConfigsJSON } from '@/helper'
const { SERVER_ORIGIN } = getConfigsJSON()

export default function xhr ({
  method = 'get',
  url = '/',
  data = null,
  params = null
}) {
  const options = {
    method,
    url: SERVER_ORIGIN + url,
    data,
    params
  }

  const response = axios(options)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.error(err)
    })

  return response
}
