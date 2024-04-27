import { Browser, Builder, By } from "selenium-webdriver"

describe('the eat page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the eat page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToEat = await driver.findElement(By.xpath(HomePage.eatPage));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        expect(await driver.getTitle()).toBe("Eat");
    });

    //  THIS ONLY PASSES WHEN THE PET IS FULL
    it("displays the 'You are full!' message", async () => {
        await driver.get("http://localhost:8081");

        const navigateToEat = await driver.findElement(By.xpath(HomePage.eatPage));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        const fullMessage = await driver.findElement(By.xpath(HomePage.fullMessage));
        expect(await fullMessage.getText()).toBe("You are full!");
    }, 20000);

    it("plays the minigame", async () => {
        await driver.get("http://localhost:8081");

        const navigateToEat = await driver.findElement(By.xpath(HomePage.eatPage));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        let correctAnswer = await driver.findElement(By.xpath(Eat.ans2));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(Eat.ans2));

        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(Eat.ans3));

        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(Eat.ans1));

        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        const hungerText = await driver.findElement(By.xpath(Eat.hungerText));
        expect(await hungerText.getText()).toBe("Hunger: 0");

        const happinessText = await driver.findElement(By.xpath(Eat.happinessText));
        expect(await happinessText.getText()).toBe("Happiness: 100");
    }, 20000);

    it("passes the minigame with 0/5", async () => {
        await driver.get("http://localhost:8081");

        const navigateToEat = await driver.findElement(By.xpath(HomePage.eatPage));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        let correctAnswer = await driver.findElement(By.xpath(Eat.ans4));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(Eat.ans4));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(Eat.ans4));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.xpath(Eat.ans4));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        const resultScoreText = await driver.findElement(By.xpath(Eat.resultText));
        expect(await resultScoreText.getText()).toBe("You got 0 out of 4 correct!");

        const hungerText = await driver.findElement(By.xpath(Eat.hungerText));
        expect(await hungerText.getText()).toBe("Hunger: 0");

        const happinessText = await driver.findElement(By.xpath(Eat.happinessText));
        expect(await happinessText.getText()).toBe("Happiness: 0");
    }, 20000);

    afterEach(async () => {
        await driver.quit();
    });
});

class HomePage {
    static eatPage = "/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div[4]/div[2]/div";
    static fullMessage = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div"
}

class Eat {
    static ans4 = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[5]/div";
    static ans3 = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[4]/div";
    static ans2 = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[3]/div";
    static ans1 = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[6]/div[2]/div";
    static resultText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[2]";
    static hungerText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[4]/div[1]";
    static happinessText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[5]/div[1]";

}