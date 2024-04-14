import { Browser, Builder, By } from "selenium-webdriver";

describe('the eat page', () => {
    let driver;
    let port = "http://localhost:19006/" // change port to the port your app is running on

    beforeEach(async () => {
        // driver = await new Builder().forBrowser(Browser.EDGE).build();
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the eat page", async () => {
        await driver.get(port);

        expect(await driver.getTitle()).toBe("Home");

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]"));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        expect(await driver.getTitle()).toBe("Eat");
    });

    //  THIS ONLY PASSES WHEN THE PET IS FULL
    it("displays the 'You are full!' message", async () => {
        await driver.get(port);

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]"));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        const fullMessage = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div"));
        expect(await fullMessage.getText()).toBe("You are full!");
    });

    it("plays the minigame", async () => {
        await driver.get(port);

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]/div"));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        let correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[3]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[2]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[5]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[4]"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        const hungerText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[4]/div[1]"));
        expect(await hungerText.getText()).toBe("Hunger: 0");

        const happinessText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[5]/div[1]"));
        expect(await happinessText.getText()).toBe("Happiness: 0");
    }, 20000);

    it("passes the minigame with 0/5", async () => {
        await driver.get(port);
        let boredDom = "/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[5]"

        const navigateToEat = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]/div"));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        let correctAnswer = await driver.findElement(By.xpath(boredDom));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(boredDom));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(boredDom));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(boredDom));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        const resultScoreText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[2]"));
        expect(await resultScoreText.getText()).toBe("You got 0 out of 4 correct!");

        const hungerText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[4]/div[1]"));
        expect(await hungerText.getText()).toBe("Hunger: 0");

        const happinessText = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[5]/div[1]"));
        expect(await happinessText.getText()).toBe("Happiness: 0");
    }, 20000);

    afterEach(async () => {
        await driver.quit();
    });
});
