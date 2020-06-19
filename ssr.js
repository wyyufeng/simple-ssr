const puppeteer = require("puppeteer");

let browserWSEndpoint = null;
const whitelist = ["document", "script", "xhr", "fetch"];
const blacklistSite = ["map.baidu", "tieba.baidu", "cnzz", "vaptcha"];
async function ssr(url) {
  if (!browserWSEndpoint) {
    const browserInstance = await puppeteer.launch({
      headless: true,
      timeout: 0,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--single-process",
      ],
    });
    browserWSEndpoint = await browserInstance.wsEndpoint();
  }
  const browser = await puppeteer.connect({ browserWSEndpoint });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (
      !whitelist.includes(req.resourceType()) ||
      blacklistSite.some((site) => req.url().includes(site))
    ) {
      return req.abort("aborted");
    }

    req.continue();
  });
  await page.goto(url, { waitUntil: "networkidle0" });
  const content = await page.content();
  console.log(`SSR rendered - ${url}`);
  await page.close();
  return content;
}
module.exports = ssr;
