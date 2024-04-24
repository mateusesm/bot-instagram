import dotenv from 'dotenv';
dotenv.config();

import { createPuppeteer } from './utils/create-puppeteer';
import { InstagramBot } from './instagram-bot';

(async function runBot() {
  const user = String(process.env.USER_INSTA);
  const password = String(process.env.PASS_INSTA);

  const { browser, page } = await createPuppeteer();
  const botInstagram = new InstagramBot(browser, page);

  await botInstagram.login(user, password);
  await botInstagram.mainPage();
})();
