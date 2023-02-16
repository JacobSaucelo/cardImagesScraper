const puppeteer = require("puppeteer");
import { Browser } from "puppeteer";

const fs = require("fs");
const url = "https://valorant.fandom.com/wiki/Player_Cards";

(async () => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto(url);
  //   await page.screenshot({ path: "sreenshot.png" });

  const valoImages = await page.$$eval("td > a.image", (links) =>
    links.map((link) => link.getAttribute("href"))
  );

  const imagesPics = valoImages.map((pic) => {
    return { imagePic: pic };
  });

  await browser.close();

  fs.writeFile("images.json", JSON.stringify(imagesPics), (err: any) => {
    if (err) throw err;
    console.log("Successfully created json data");
  });
})();
