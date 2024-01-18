import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});

app.get("/extract", async (req, res) => {
  console.log("req.query.url", req.query.url);
  const url = req.query.url;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const special_characters = /[\[\],"\{\}\(\)\<\>\/\?;\:|\`~\!\@\#\$\%\^\&\*\_\-\+\=\. ]/g;

  const texts = await page.$$eval(
    "p, h1, h2, h3, h4, h5, h6, li, a",
    (elements, special_characters) =>
      elements.map((element) =>
        element.textContent.replace(special_characters, "")
      ),
    special_characters
  );
  await browser.close();
  res.json({ texts });
  // console.log("texts", texts);
});
