export function getConfigsJSON () {
  try {
    return require('@/configs/index.json')
  } catch (error) {
    return process.env.SERVER_ORIGIN
  }
}
