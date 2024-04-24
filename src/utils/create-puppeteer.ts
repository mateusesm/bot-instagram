import puppeteer, { Browser, Page } from 'puppeteer';

type PuppeteerParams = {
  browser: Browser;
  page: Page;
};

export async function createPuppeteer(): Promise<PuppeteerParams> {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  return {
    browser,
    page,
  };
}
