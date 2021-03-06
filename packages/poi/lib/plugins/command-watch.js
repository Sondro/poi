exports.name = 'builtin:command-watch'

exports.apply = api => {
  api.registerCommand(
    'watch',
    'Run app in watch mode (Like dev command but without a server)',
    () => {
      const compiler = api.createWebpackCompiler(api.resolveWebpackConfig())
      compiler.watch({}, () => {
        // Do nothing...
      })
    }
  )

  if (api.command === 'watch') {
    api.chainWebpack(config => {
      config.plugin('report-status').tap(([options]) => [
        Object.assign({}, options, {
          showFileStats: true
        })
      ])
    })
  }
}

exports.commandInternals = {
  watch: {
    mode: 'development',
    watchPkg: true
  }
}
