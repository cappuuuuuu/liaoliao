const stickers = []
const addImages = (name) => {
  const items = []
  const stickerTotalImage = 8

  for (let i = 1; i < stickerTotalImage + 1; i++) {
    items.push(require(`../../assets/sticker/${name}/${name}-${i}.png`))
  }
  stickers.push({
    name,
    imageUrl: items
  })
}

const stickerNameList = [
  'rabbit',
  'yosistamp',
  'panda',
  'cat',
  'whitebear',
  'whitebear_more_1',
  'whitebear_more_2',
  'whitebear_more_3'
]

stickerNameList.forEach(item => { addImages(item) })
export default stickers
