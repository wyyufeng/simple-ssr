module.exports = {
  apps: [
    {
      name: "ssr",
      script: "./app.js",
      instances: 2,
      env: {
        NODE_ENV: "production",
      },
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      time: true,
    },
  ],
};
