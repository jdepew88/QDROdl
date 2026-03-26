/**
 * PM2 process file. On the server, from this directory:
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup   # survive reboot (follow PM2’s printed command)
 */

module.exports = {
  apps: [
    {
      name: "qdrodl-site",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
