#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '/../node_modules/'
const { resolve } = require('path')
const res = command => resolve(__dirname, '../commands/', command)
const program = require('commander')

program.version(require('../package').version )

program.usage('<command>')

program.command('create <dir> [args...]')
  .description('创建模板')
  .alias('c')
  .action((dir, names) => {
    require(res('create'))
  })

program.parse(process.argv)