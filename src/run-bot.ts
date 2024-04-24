import { createPuppeteer } from './utils/create-puppeteer';
import { InstagramBot } from './instagram-bot';

export async function runBot(user: string, password: string): Promise<void> {
  const { browser, page } = await createPuppeteer();
  const botInstagram = new InstagramBot(browser, page);

  await botInstagram.login(user, password);
  await botInstagram.mainPage();
}
