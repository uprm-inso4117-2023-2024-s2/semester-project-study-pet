const {Given, When, Then, BeforeAll, AfterAll} = require('@cucumber/cucumber');
const {Browser, Builder, By} = require("selenium-webdriver");
const {expect} = require("expect");
const questionsData = require("../../assets/data/questions.json");
const {NoSuchElementError} = require("selenium-webdriver/lib/error");

let driver;

BeforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
});

AfterAll(async () => {
    await driver.quit();
});

////// Game Tests
Given("User at Home Page", async () => {
    await driver.get("http://localhost:8081");

    expect(await driver.getTitle()).toBe("Home");
});

When("User Clicks The Navigate to Game Page Button", async () => {
    const navigateToGamePage = await driver.findElement(By.xpath(HomePage.navigateToGamePage));
    navigateToGamePage.click();
});

When("User Sets Difficulty to {string}", async (difficulty) => {
    let difficultyButtonXpath;
    switch (difficulty) {
        case "Easy":
            difficultyButtonXpath = GamePageMiniGame.easyDifficulty;
            break;
        case "Medium":
            difficultyButtonXpath = GamePageMiniGame.mediumDifficulty;
            break;
        case "Hard":
            difficultyButtonXpath = GamePageMiniGame.hardDifficulty;
            break;
    }

    const difficultyButton = await driver.findElement(By.xpath(difficultyButtonXpath));
    difficultyButton.click();

    await driver.manage().setTimeouts({implicit: 1000});

    const difficultySelected = await driver.findElement(By.xpath(GamePageMiniGame.difficultySelected));
    expect(await difficultySelected.getText()).toBe(`Selected Value: ${difficulty.toLowerCase()}`);
});

When("User Plays Through The Game Scoring {int} out of {int}", async (score, totalQuestions) => {
    await GamePageMiniGame.playMiniGame(driver, score, totalQuestions);
});

When("User At Finished Screen", async () => {
    const finishedText = await driver.findElement(By.xpath(GamePageMiniGame.finishedText));
    expect(await finishedText.getText()).toBe("Finished!");
});

Then("User At Game Page", async () => {
    expect(await driver.getTitle()).toBe("Game");
});

Then("User At The First Question", async () => {
    const questionText = await driver.findElement(By.xpath(GamePageMiniGame.questionText));
    expect(await questionText.getText()).toBe(questionsData[0].question);
});

Then("Scoring Should Be {int} of {int}", async (score, totalQuestions) => {
    const resultText = await driver.findElement(By.xpath(GamePageMiniGame.scoringText));
    expect(await resultText.getText()).toBe(`You got ${score} out of ${totalQuestions} correct!`);
});

////// Shop Tests
When("User Clicks The Navigate to Shop Page Button", async () => {
    const navigateToShopPage = await driver.findElement(By.xpath(HomePage.navigateToShopPage));
    navigateToShopPage.click();
});

Then("User At Shop Page", async () => {
    expect(await driver.getTitle()).toBe("Shop");
});

When("User Filters by {string}", async (filter) => {
    let filterButtonXpath;
    switch (filter) {
        case "All":
            filterButtonXpath = ShopPage.allFilter;
            break;
        case "Food":
            filterButtonXpath = ShopPage.foodFilter;
            break;
        case "Toys":
            filterButtonXpath = ShopPage.toysFilter;
            break;
        case "Clothes":
            filterButtonXpath = ShopPage.clothesFilter;
            break;
        case "Other":
            filterButtonXpath = ShopPage.otherFilter;
            break;
    }

    const filterButton = await driver.findElement(By.xpath(filterButtonXpath));
    filterButton.click();
});

Then("{string} Items Show", async (filter) => {
    let itemsThatShouldShow = [];
    switch (filter) {
        case "All":
            itemsThatShouldShow = ShopPage.allItems;
            break;
        case "Food":
            itemsThatShouldShow = [ShopPage.itemOne, ShopPage.itemTwo, ShopPage.itemThree];
            break;
        case "Toys":
        case "Clothes":
            itemsThatShouldShow = [ShopPage.itemOne];
            break;
    }

    for (const itemXpath of itemsThatShouldShow) {
        await driver.manage().setTimeouts({implicit: 1000});

        const item = await driver.findElement(By.xpath(itemXpath));
        item.click();
    }

    const itemsThatShouldNotShow = ShopPage.allItems.filter(itemXpath => !itemsThatShouldShow.includes(itemXpath));
    for (const itemXpath of itemsThatShouldNotShow) {
        await driver.manage().setTimeouts({implicit: 1000});

        try {
            await driver.findElement(By.xpath(itemXpath));
            throw new Error("Item should not exist!");
        } catch (e) {
            if (!(e instanceof NoSuchElementError)) {
                throw new Error("Item should not exist!");
            }
        }
    }
});

When("User Buys {string}", async (itemName) => {
    if (itemName === "All") {
        for (const itemXpath of ShopPage.allItems) {
            await driver.manage().setTimeouts({implicit: 1000});
            const item = await driver.findElement(By.xpath(itemXpath));
            item.click();
        }
    } else {
        let itemXpath;
        switch (itemName) {
            case "Orange Juice":
                itemXpath = ShopPage.itemOne;
                break;
            case "Apple Juice":
                itemXpath = ShopPage.itemTwo;
                break;
            case "Banana Juice":
                itemXpath = ShopPage.itemThree;
                break;
            case "Ball":
                itemXpath = ShopPage.itemFour;
                break;
            case "Los Diablos Ski Mask":
                itemXpath = ShopPage.itemFive;
                break;
        }
        const item = await driver.findElement(By.xpath(itemXpath));
        item.click();
    }
});

When("User Resets Money", async () => {
    const resetMoney = await driver.findElement(By.xpath(ShopPage.reset));
    resetMoney.click();
});

Then("Money Left is {string}", async (balance) => {
    const money = await driver.findElement(By.xpath(ShopPage.money));
    expect(await money.getText()).toBe(balance);
});

class HomePage {
    static navigateToGamePage = "/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[3]";
    static navigateToShopPage = "/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[5]";
}

class GamePageMiniGame {
    static easyDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]";
    static mediumDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[2]";
    static hardDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[3]";

    static difficultySelected = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[4]";

    static questionText = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div[1]/div";

    static optionOne = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div[2]";
    static optionTwo = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div[3]";
    static optionThree = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div[4]";
    static optionFour = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div[5]";

    static finishedText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[1]";
    static scoringText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[2]";

    static async playMiniGame(driver, score, totalQuestions) {
        let wrongAnswerAmount = totalQuestions - score;
        for (let i = 0; i < totalQuestions; i++) {
            await driver.manage().setTimeouts({implicit: 1000});

            // Questions are randomized, so we have to find the question displayed in order to know the answer
            const questionTextElement = await driver.findElement(By.xpath(GamePageMiniGame.questionText));
            const questionText = await questionTextElement.getText()

            let question;
            for (const q of questionsData) {
                if (q.question === questionText) {
                    question = q;
                    break;
                }
            }

            // Ensure that it finds the correct question
            expect(question.question).toBe(questionText);

            let correctAnswerNumber = question.correctAnswerIndex + 1;
            if (wrongAnswerAmount > 0) {
                correctAnswerNumber++;
                wrongAnswerAmount--;
            }

            let correctAnswerButtonXpath;
            switch (correctAnswerNumber) {
                case 1:
                    correctAnswerButtonXpath = GamePageMiniGame.optionOne;
                    break;
                case 2:
                    correctAnswerButtonXpath = GamePageMiniGame.optionTwo;
                    break;
                case 3:
                    correctAnswerButtonXpath = GamePageMiniGame.optionThree;
                    break;
                case 4:
                    correctAnswerButtonXpath = GamePageMiniGame.optionFour;
                    break;
            }

            const correctAnswer = await driver.findElement(By.xpath(correctAnswerButtonXpath));
            correctAnswer.click()
        }
    }
}

class ShopPage {
    static money = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[1]/div[1]";

    static allFilter = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/div/div[1]/div/div";
    static foodFilter = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/div/div[2]/div/div";
    static toysFilter = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/div/div[3]/div/div";
    static clothesFilter = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/div/div[4]/div/div";
    static otherFilter = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[1]/div[2]/div/div[5]/div/div";

    static itemOne = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div";
    static itemTwo = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[2]/div";
    static itemThree = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[3]/div";
    static itemFour = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[4]/div";
    static itemFive = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div";
    static allItems = [ShopPage.itemOne, ShopPage.itemTwo, ShopPage.itemThree, ShopPage.itemFour, ShopPage.itemFive];

    static reset = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]";
}