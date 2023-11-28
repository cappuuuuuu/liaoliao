import xhr from './xhr'

export default function getAvatars () {
  return xhr({
    method: 'get',
    url: 'member/avatar'
  })
}
