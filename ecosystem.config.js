module.exports = {
  apps: [
    {
      name: 'Autotarget.com.ua',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}