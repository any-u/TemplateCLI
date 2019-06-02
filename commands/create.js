const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp');
const download = require('download-git-repo');
const rimraf = require('rimraf');

const log = console.log,
  getDirName = require('path').dirname;

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

const writeFile = (path, contents) => {
  return new Promise((resolve, reject) => {
    mkdirp(getDirName(path), function (err) {
      if (err) return reject(err);
      fs.writeFile(path, contents, (err) => {
        err ? reject(err) : resolve()
      });
    });
  })
}

module.exports = prompt(question).then(({ frame }) => {
  const format = frame === 'React' ? '.js' : '.vue',
    checkFormat = ora('检查格式中...\n')

  // 识别文件名和format格式是否一致
  checkFormat.start()
  files.forEach(item => {
    if (!item.includes(format)) {
      checkFormat.fail()
      log(chalk.red("请选择正确格式"))
      process.exit()
    }
  });
  checkFormat.stop()

  const spinner = ora('正在下载模板...\n')
  spinner.start()

  download('https://github.com:sillyY/TemplateCLI#master', 'templates', { clone: true }, (err) => {
    if (err) {
      spinner.fail();
      log(chalk.red(err));
    } else {
      spinner.succeed();
      var a = path.resolve(`./templates/templates/${frame}/index${format}`)
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
              await writeFile(`./${dir}/${name}`, template)
              return
            } catch (e) {
              spinner.fail()
              log(chalk.red(e))
              process.exit()
            }
          })
        )
        spinner.stop()
        rimraf('./templates', (err)=>{
          if(err) {
            log(chalk.red(`模板删除失败,请手动删除模板文件`))
            process.exit()
          }
          log(chalk.green('模板生成成功'))
        })
      })
    }

  })
})
