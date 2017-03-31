// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
export default {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: config => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    proxy: {
      enabled: true,
      options: [{
        host: 'http://120.27.156.197:8888',
        match: /^\/api_firstgrid\/.*/,
        filter: 'api_firstgrid'
      }, {
        host: 'http://120.27.156.197:8004',
        match: /^\/api_firstgridRA\/.*/,
        filter: 'api_firstgridRA'
      }, {
        host: 'http://120.27.156.197:8002',
        match: /^\/api_firstgridFS\/.*/,
        filter: 'api_firstgridFS'
      }, {
        host: 'http://120.27.156.197:8005',
        match: /^\/api_firstgridSFDA\/.*/,
        filter: 'api_firstgridSFDA'
      }]
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: config => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
      children: false
    }
  })
}
