## Warning! Instagram has been updated, then It's broken the bot. As soon, I'll update him.

### Instagram bot to consult unfollowers

The Instagram bot is a simple project make with Node.js and a library called Puppeteer. The project is object oriented.

Puppeteer: (https://github.com/puppeteer/puppeteer)

The Instagram bot make log in your Instagram, that's analyze your follower persons and following persons and say who you follower that not following you.

Make sure you have a .env file containing next keys: USER_INSTA=your user and PASS_INSTA=your password in the root of project for that the bot can make log in.

You also can to see bot in action on browser window, changing:

```bash
 const browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: null
    })
```
to

```bash
 const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
    })
```
### Installation

After downloading this project, make sure you have Node JS installed on your machine by running the following command:

```bash
node --version
```
The command should return the version of Node JS installed. If not, download it.

After installing Node JS, you will need to download the necessary modules, for that, inside the terminal, in the project folder execute the command:

Use your preferred package manager (npm, yarn, etc.) to install all dependencies, in my case, I used npm:

```bash
npm install
```
### Running the project

For running bot, run the next command:

```bash
node index
```