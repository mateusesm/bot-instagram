import { Browser, Page } from 'puppeteer';

export class InstagramBot {
  private INSTAGRAM_URL = 'https://www.instagram.com';
  private user = '';
  private unfollowersList = [];

  private inputUserSelected = 'input[name="username"]';
  private inputPasswordSelected = 'input[name="password"]';
  private buttonLoginSelected = 'button[type="submit"]';
  private numberFollowersClass = 'span._ac2a span';
  private allPersonsBoxClass = 'span._aacl';

  constructor(
    private browser: Browser,
    private page: Page,
  ) {}

  async login(user: string, password: string): Promise<void> {
    console.log('Iniciando o Bot... Aguarde!');
    console.log('Pronto para começar!');
    console.log('Entrando no Instagram...');

    try {
      await this.page.goto(this.INSTAGRAM_URL);
      await this.page.waitForSelector(this.inputUserSelected);
      await this.page.type(this.inputUserSelected, user);

      await this.page.waitForSelector(this.inputPasswordSelected);
      await this.page.type(this.inputPasswordSelected, password);

      await this.page.click(this.buttonLoginSelected);
      await this.page.waitForNavigation();

      this.user = user;
    } catch (error) {
      console.log('ERRO AO ENTRAR NO INSTAGRAM. ERRO: ', error);
    }
  }

  async mainPage(): Promise<void> {
    await this.page.goto(`${this.INSTAGRAM_URL}/${this.user}`);
  }

  isLogged(): boolean {
    return this.user !== '';
  }

  /* try {
      console.log('Entrando no Instagram...');


      console.log('Obtendo número de seguidores e de seguidos...');
      const [numberFollowers, numberFollowing] =
      await this.getNumberFollowersAndFollowing();

      await this.page.goto(`${this.urlInstagram}/${this.user}/followers`);
      followersBrute = await this.getPersonsNicknames(numberFollowers);

      await this.page.goto(`${this.urlInstagram}/${this.user}/following`);
      followingBrute = await this.getPersonsNicknames(numberFollowing);

      this.browser.close();
    } catch (err) {
      this.browser.close();
      console.log(err);
    }

    const followers = await this.removeVerified(followersBrute);
    const following = await this.removeVerified(followingBrute);

    console.log('Verificando quem você segue que não te segue de volta...');
    const unfollowers = this.verifyWhoFollowBack(followers, following);

    this.unfollowersList = [...unfollowers];
    this.showUnfollowers();*/

  /*
  async getPersonsNicknames(numberPersons: number) {
    if (!this.page) return;

    let allPersons = [];

    await this.page.waitForSelector(this.allPersonsBoxClass);
    allPersons = await this.page.$$eval(
      this.allPersonsBoxClass,
      (span) => span.innerText,
    );

    while (allPersons.length < numberPersons) {
      await this.page.evaluate(() => {
        const dialogPersonsClass = 'div._aano';
        document.querySelector(dialogPersonsClass).scrollBy(0, 10000);
      });

      await this.page.waitForSelector(this.allPersonsBoxClass);
      allPersons = await this.page.$$eval(this.allPersonsBoxClass, (spans) =>
        spans.map((span) => {
          return span.innerText;
        }),
      );
    }

    return allPersons;
  }

  async getNumberFollowersAndFollowing() {
    if (!this.page) return;

    await this.page.waitForSelector(this.numberFollowersClass);
    const numbersOfProfile = await this.page.$$eval(
      this.numberFollowersClass,
      (spans) => {
        return spans.map((span) => span.innerText);
      },
    );

    const numberFollowers = Number(numbersOfProfile[1]);
    const numberFollowing = Number(numbersOfProfile[2]);

    return [numberFollowers, numberFollowing];
  }

  async removeVerified(personNicknames: string) {
    if (!personNicknames) return null;
    if (personNicknames.length === 0) return null;

    const personsWithoutVerified = personNicknames.filter(
      (person) => person !== 'Verified',
    );

    return personsWithoutVerified;
  }

  verifyWhoFollowBack(followers: string[], following: string[]) {
    if (!followers || !following) return ['Arrays inválidos'];
    if (followers.length === 0 || following.length === 0)
      return ['Arrays inválidos'];

    const unFollowers = [];

    for (const person of following) {
      const isFollower = followers.indexOf(person);

      if (isFollower === -1) {
        unFollowers.push(person);
      }
    }

    return unFollowers;
  }

  showUnfollowers() {
    console.log('-------------------------------------');
    console.log('Lista de seus Não Seguidores:');
    console.log('-------------------------------------');
    let count = 1;
    this.unfollowersList.forEach((unfollower) => {
      console.log(`${count} - ${unfollower}`);
      count++;
    });
  }
*/
}
