import puppeteer from 'puppeteer';

const scrapeData = async (link) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(link);

    const textContent = await page.evaluate(() => {
      return document.documentElement.textContent;
    });

    await browser.close();

    return textContent;

  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while scraping data.");
  }
};

export default scrapeData;
