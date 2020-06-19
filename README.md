使用方法

服务配置

```javascript
// config.js

module.exports = {
  // 启动端口
  port: 3300,
  // 目标网站地址
  target: "http://127.0.0.1",
  // redis配置
  redis: {
    host: "127.0.0.1",
    password:your password
  },
};

```

nginx 配置
```
if ($http_user_agent ~* "googlebot|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|facebookexternalhit|twitterbot|developers\.google\.com") {
		  proxy_pass http://127.0.0.1:3300;
		}
```

使用pm2启动服务
```bash
 npm install pm2 -g
 pm2 start ecosystem.config.js
```
