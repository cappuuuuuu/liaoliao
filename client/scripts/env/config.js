
const chalk = require('chalk')
const yargs = require('yargs')(process.argv.slice(2))
const packageJSON = require('../../package.json')

const envVariableRe = /\{\{([A-Z_-]+)}}/
function interpolateVariables (config, variableMapping) {
  let stringifiedConfig = JSON.stringify(config)
  while (envVariableRe.test(stringifiedConfig)) {
    stringifiedConfig = stringifiedConfig.replace(envVariableRe, (substring) => {
      return variableMapping[substring.slice(2, -2)]
    })
  }
  return JSON.parse(stringifiedConfig)
}

function getConfigsFromLocal () {
  try {
    return require(`${process.cwd()}/.env.config.json`)
  } catch (error) {
    return null
  }
}

const argv = yargs
  .option('env', {
    desc: 'Switch environment configuration',
    type: 'string',
    alias: 'e',
  })
  .argv

let configs = getConfigsFromLocal()
configs = interpolateVariables(configs, {
  VERSION: packageJSON.version,
})


if (configs[argv.env] === undefined) {
  console.log(chalk.red(`Invalid env: ${argv.env}!`), `use one of the following: [${chalk.green(Object.keys(configs).join(', '))}] instead.`)
  process.exit(1)
}

module.exports = configs[argv.env]
