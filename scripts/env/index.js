const configs = require('./config')
const fs = require('fs')
const chalk = require('chalk')

const finalConfigJson = JSON.stringify(configs, null, 2)

try {
  fs.writeFileSync('src/configs/index.json', finalConfigJson)
} catch (error) {
  console.error('Failed to write config.')
  process.exit(1)
}

console.log('      *************************************************************************')
const keys = Object.keys(configs)
for (const key of keys) {
  console.log(`      > ${chalk.green(key)}: ${JSON.stringify(configs[key])}`)
}
console.log('      *************************************************************************')