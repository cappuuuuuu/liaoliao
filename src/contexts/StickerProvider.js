import React, { useContext, useEffect, useState, createContext } from 'react'
import getStickers from '@/services/stickerServices'

const StickerContext = createContext()

export function useSticker () {
  return useContext(StickerContext)
}

export function StickerProvider ({ children }) {
  const [sticker, setSticker] = useState([])

  useEffect(() => {
    async function getStickerData () {
      const result = await getStickers()

      // Preload sticker images
      result.forEach(sticker => {
        sticker.data.forEach(item => {
          new Image().src = item.url
        })
      })

      setSticker(result)
    }
    getStickerData()
  }, [])

  return (
    <StickerContext.Provider value={sticker}>
      { children }
    </StickerContext.Provider>
  )
}
