const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const path = require('path')

const log = console.log

const option = program.parse(process.argv).args,
  dir = option[0],
  files = option[1]

log(dir, files)

const question = [
  {
    type: 'list',
    name: 'frame',
    message: '请选择项目框架',
    choices: [
      {
        name: 'React'
      },
      {
        name: 'Vue'
      }
    ],
    validate(val) {
      return true
    },
    transformer(val) {
      return val
    }
  }
]

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

module.exports = prompt(question).then(({ frame }) => {
  const spinner = ora('生成模板中...\n'),
    format = frame === 'React' ? '.js' : '.vue'
  spinner.start()
  var a = path.resolve(`./templates/${frame}/index${format}`)
  fs.readFile(a, 'utf8', async (err, data) => {
    if (err) {
      spinner.stop()
      log(chalk.red(err))
      return
    }

    await Promise.all(
      files.map(async name => {

        let template = data.replace(
          /App/g,
          (name.charAt(0).toUpperCase() + name.slice(1)).replace(format, '')
        )
        try {
          return await writeFile(`./${dir}/${name}`, template)
        } catch (e) {
          spinner.fail()
          log(chalk.red(e))
          process.exit()
          return
        }
      })
    )
    log(chalk.green(`文件生成成功`))
    spinner.stop()
  })
})
