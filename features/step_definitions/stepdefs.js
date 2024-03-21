const {Given, When, Then, BeforeAll, AfterAll} = require('@cucumber/cucumber');
const {Browser, Builder, By} = require("selenium-webdriver");
const {expect} = require("expect");
const questionsData = require("../../assets/data/questions.json");

let driver;

BeforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
});

AfterAll(async () => {
    await driver.quit();
});

Given("User at Home Page", async () => {
    await driver.get("http://localhost:8081");

    expect(await driver.getTitle()).toBe("Home");
});

When("User Clicks The Navigate to Game Page Button", async () => {
    const navigateToGamePage = await driver.findElement(By.xpath(HomePage.navigateToGamePage));
    navigateToGamePage.click();
});

When("User Plays Through The Game Scoring {int}", async (expectedScoring) => {
    await GamePageMiniGame.playMiniGame(driver, expectedScoring);
});

When("User At Finished Screen", async () => {
    const finishedText = await driver.findElement(By.xpath(GamePageMiniGame.finishedText));
    expect(await finishedText.getText()).toBe("Finished!");
});

When("User Clicks The Play Again Button", async () => {
    const playAgainButton = await driver.findElement(By.xpath(GamePageMiniGame.playAgainButton));
    playAgainButton.click();
});

Then("User At Game Page", async () => {
    expect(await driver.getTitle()).toBe("Game");
});
Then("User At The First Question", async () => {
    const questionText = await driver.findElement(By.xpath(GamePageMiniGame.questionText));
    expect(await questionText.getText()).toBe(questionsData[0].question);
});

Then("Scoring Should Be {int}", async (scoring) => {
    const resultText = await driver.findElement(By.xpath(GamePageMiniGame.scoringText));
    expect(await resultText.getText()).toBe(`You got ${scoring} out of 5 correct!`);
});

class HomePage {
    static navigateToGamePage = "/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[3]";
}

class GamePageMiniGame {
    static questionText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div[1]/div";

    static optionOne = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div[2]";
    static optionTwo = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div[3]";
    static optionThree = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div[4]";
    static optionFour = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div[5]";

    static finishedText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[1]";
    static scoringText = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[2]";
    static playAgainButton = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[3]";

    static async playMiniGame(driver, expectedScoring) {
        let wrongAnswerAmount = 5 - expectedScoring;
        for (let i = 0; i < questionsData.length; i++) {
            const question = questionsData[i];

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

            await driver.manage().setTimeouts({implicit: 1000});
        }
    }
}
