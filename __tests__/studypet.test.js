import {Browser, Builder, By} from "selenium-webdriver"
import {NoSuchElementError} from "selenium-webdriver/lib/error";


describe('the eat page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the eat page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]"));
        navigateToEat.click();

        await driver.manage().setTimeouts({implicit: 1000});

        expect(await driver.getTitle()).toBe("Eat");
    });

    it("passes the minigame with 0/5", async () => {
        await driver.get("http://localhost:8081");

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]"));
        navigateToEat.click();

        await driver.manage().setTimeouts({implicit: 1000});

        let correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        const resultScoreText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[2]"));
        expect(await resultScoreText.getText()).toBe("You got 0 out of 5 correct!");

        const hungerText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[4]/div[1]"));
        expect(await hungerText.getText()).toBe("Hunger: -0");

        const happinessText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[5]/div[1]"));
        expect(await happinessText.getText()).toBe("Happiness: +0");
    });

    it("passes the minigame with 3/5", async () => {
        await driver.get("http://localhost:8081");

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]"));
        navigateToEat.click();

        await driver.manage().setTimeouts({implicit: 1000});

        let correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        const resultScoreText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[2]"));
        expect(await resultScoreText.getText()).toBe("You got 3 out of 5 correct!");

        const hungerText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[4]/div[1]"));
        expect(await hungerText.getText()).toBe("Hunger: -3");

        const happinessText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[5]/div[1]"));
        expect(await happinessText.getText()).toBe("Happiness: +3");
    });

    it("passes the minigame with 5/5", async () => {
        await driver.get("http://localhost:8081");

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]"));
        navigateToEat.click();

        await driver.manage().setTimeouts({implicit: 1000});

        let correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[4]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({implicit: 1000});

        const resultScoreText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[2]"));
        expect(await resultScoreText.getText()).toBe("You got 5 out of 5 correct!");

        const hungerText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[4]/div[1]"));
        expect(await hungerText.getText()).toBe("Hunger: -5");

        const happinessText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div[5]/div[1]"));
        expect(await happinessText.getText()).toBe("Happiness: +5");
    });

    afterEach(async () => {
        await driver.quit();
    });
});