require('dotenv').config()
const puppeteer = require('puppeteer')

class BotInstagram {
    #urlInstagram = 'https://www.instagram.com'
    #user = process.env.USER_INSTA
    #password = process.env.PASS_INSTA
    
    #inputUserSelect = 'input[name="username"]'
    #inputPasswordSelect = 'input[name="password"]'
    #buttonLoginSelect = 'button[type="submit"]'

    #numberFollowersClass = 'span._ac2a span'
    #allPersonsBoxClass = 'div._aano div'

    #unfollowersList = []

    constructor(puppeteer) {
        if (this.#unfollowersList.length > 0) {
            this.showUnfollowers()
        } else {
            this.startPuppeteer(puppeteer)
        }  
    }

    async startPuppeteer() {
        console.log('Processo em andamento... Aguarde!')
        const browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: null
        })
        
        const page = await browser.newPage()
    
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36')
    
        let followersBrute = []
        let followingBrute = []
    
        try {
            console.log('Entrando no Instagram...')
            await page.goto(this.#urlInstagram)
    
            const inputUserName = await page.waitForSelector(this.#inputUserSelect)
    
            if (inputUserName) {
                console.log('Logando no Instagram...')
                await this.loginOnInstagram(page)
                await page.waitForNavigation()
            }
               
            await page.goto(`${this.#urlInstagram}/${this.#user}`)
           
            console.log('Obtendo número de seguidores e de seguidos...')
            const [numberFollowers, numberFollowing] = await this.getNumberFollowersAndFollowing(page)
       
            await page.goto(`${this.#urlInstagram}/${this.#user}/followers`)
            followersBrute = await this.getPersonsNicknames(page, numberFollowers)
    
            await page.goto(`${this.#urlInstagram}/${this.#user}/following`)
            followingBrute = await this.getPersonsNicknames(page, numberFollowing)
    
            browser.close() 
    
        } catch (err) {
            browser.close()
            console.log(err)
        }
    
        const followers = await this.removeVerified(followersBrute)
        const following = await this.removeVerified(followingBrute)
    
        console.log('Verificando quem você segue que não te segue de volta...')
        const unfollowers = this.verifyWhoFollowBack(followers, following)
    
        this.#unfollowersList = [...unfollowers]
        this.showUnfollowers()
    }

    async loginOnInstagram(page) {
        await page.waitForSelector(this.#inputUserSelect)
        await page.type(this.#inputUserSelect, this.#user)

        await page.waitForSelector(this.#inputPasswordSelect)
        await page.type(this.#inputPasswordSelect, this.#password)

        await page.click(this.#buttonLoginSelect)
    }

    async getPersonsNicknames(page, numberPersons) {
        let allPersons = []

        await page.waitForSelector(this.#allPersonsBoxClass)
        allPersons = await page.$$eval(this.#allPersonsBoxClass, (divs) => divs.map((div) => {
            return div
        }))

        console.log('Here', allPersons)
        return

        /*while (allPersons.length < numberPersons) {
            await page.evaluate(() => {
                const dialogPersonsClass = 'div._aano'
                document.querySelector(dialogPersonsClass).scrollBy(0, 10000)
            })

            await page.waitForSelector(this.#allPersonsBoxClass)
            allPersons = await page.$$eval(this.#allPersonsBoxClass, (spans) => spans.map((span) => { 
                return span.innerText
            }))
        }

        return allPersons*/
    }

    async getNumberFollowersAndFollowing(page) {
        await page.waitForSelector(this.#numberFollowersClass)
        const numbersOfProfile = await page.$$eval(this.#numberFollowersClass, (spans) => {
            return spans.map((span) => span.innerText)
        })
    
        const numberFollowers = Number(numbersOfProfile[1])
        const numberFollowing = Number(numbersOfProfile[2])

        return [numberFollowers, numberFollowing]
    }

    async removeVerified(personNicknames) {
        if (!personNicknames) return null
        if (personNicknames.length === 0) return null
      
        const personsWithoutVerified = personNicknames.filter((person) => person !== 'Verified')

        return personsWithoutVerified
    }

    verifyWhoFollowBack(followers, following) {
        if (!followers || !following) return ['Arrays inválidos']
        if (followers.length === 0 || following.length === 0) return ['Arrays inválidos']
        
        let unFollowers = []

        for (let person of following) {
            const isFollower = followers.indexOf(person)

            if (isFollower === -1) {
                unFollowers.push(person)
            }
        }

        return unFollowers
    }

    showUnfollowers() {
        console.log('-------------------------------------')
        console.log('Lista de seus Não Seguidores:')
        console.log('-------------------------------------')
        let count = 1
        this.#unfollowersList.forEach((unfollower) => {
            console.log(`${count} - ${unfollower}`)
            count++
        })
    }
    
}

const botInstagram = new BotInstagram(puppeteer)
