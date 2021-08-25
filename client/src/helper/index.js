export function getConfigsJSONFromLocal () {
    try {
        return require(`../configs/index.json`)
    } catch (error) {
        return null
    }
}