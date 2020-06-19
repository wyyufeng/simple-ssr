const express = require("express");
const cacheDB = require("./db");
const ssr = require("./ssr");
const config = require("./config");

const app = express();
const port = config.port;

app.get("*", (req, res) => {
  const url = config.target + req.originalUrl;
  const ua = req.get("User-Agent");
  console.log(`${ua} request - ${url}`);
  const cacheKey = `ssr:${url}`;
  cacheDB
    .get(cacheKey)
    .then((cache) => {
      if (cache) {
        console.log(`${cacheKey} hited the cache `);
        res.send(cache);
      } else {
        console.log(`${cacheKey} missed the cache `);
        ssr(url).then((content) => {
          cacheDB.set(cacheKey, content);
          res.send(content);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () =>
  console.log(`SSR app listening at http://localhost:${port}`)
);
