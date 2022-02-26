import xhr from './xhr'

export default function getStickers () {
  return xhr({
    method: 'get',
    url: 'stickers'
  })
}
