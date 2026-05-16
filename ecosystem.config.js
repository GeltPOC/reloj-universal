module.exports = {
  apps: [{
    name: 'reloj-universal',
    script: 'npm',
    args: 'start -- -p 3014',
    cwd: '/home/gelt/apps/reloj-universal',
    env: {
      NODE_ENV: 'production',
      PORT: 3014,
    },
  }],
}
