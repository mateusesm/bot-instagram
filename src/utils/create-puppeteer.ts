import puppeteer, { Browser, Page } from 'puppeteer';

export async function createPuppeteer() {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  return {
    browser,
    page,
  };
}
