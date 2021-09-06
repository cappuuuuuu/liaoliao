export function getConfigsJSON () {
  try {
    return require('@/configs/index.json')
  } catch (error) {
    return { SERVER_ORIGIN: process.env.SERVER_ORIGIN }
  }
}
