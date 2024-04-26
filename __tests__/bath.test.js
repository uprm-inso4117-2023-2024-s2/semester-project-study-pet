import {Browser, Builder, By} from "selenium-webdriver"
import {NoSuchElementError} from "selenium-webdriver/lib/error";

const mockFlashcards = [
    {question: 'What is the capital of France?', answer: 'Paris'},
    {question: 'Which planet is known as the Red Planet?', answer: 'Mars'},
    {question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare'},
    {question: 'What is the chemical symbol for water?', answer: 'H2O'},
    {question: 'What is the tallest mammal?', answer: 'Giraffe'},
    {question: 'Which country is famous for its pyramids?', answer: 'Egypt'},
    {question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci'},
    {question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean'},
    {question: 'What is the chemical symbol for gold?', answer: 'Au'},
    {question: 'Which bird can fly backwards?', answer: 'Hummingbird'},
];

describe('the bath page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("navigates to the bath page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToBath = await driver.findElement(By.xpath(HomePage.bathPage));
        navigateToBath.click();

        await driver.manage().setTimeouts({implicit: 10000});

        expect(await driver.getTitle()).toBe("Bath");
    });

    describe("changes difficulty", () => {
        beforeEach(async () => {
            await driver.get("http://localhost:8081");
            const navigateToBath = await driver.findElement(By.xpath(HomePage.bathPage));
            navigateToBath.click();
        });

        it("changes difficulty to easy", async () => {
            const easy = await driver.findElement(By.xpath(BathPage.easyDifficulty));
            easy.click();

            await driver.manage().setTimeouts({implicit: 10000});

            const difficulty = await driver.findElement(By.xpath(BathPage.selectedDifficulty));
            expect(await difficulty.getText()).toBe("Selected Value: easy");
        });

        it("changes difficulty to medium", async () => {
            const medium = await driver.findElement(By.xpath(BathPage.mediumDifficulty));
            medium.click();

            await driver.manage().setTimeouts({implicit: 10000});

            const difficulty = await driver.findElement(By.xpath(BathPage.selectedDifficulty));
            expect(await difficulty.getText()).toBe("Selected Value: medium");
        });

        it("changes difficulty to hard", async () => {
            const hard = await driver.findElement(By.xpath(BathPage.hardDifficulty));
            hard.click();

            await driver.manage().setTimeouts({implicit: 10000});

            const difficulty = await driver.findElement(By.xpath(BathPage.selectedDifficulty));
            expect(await difficulty.getText()).toBe("Selected Value: hard");
        });
    });

    describe("play game at easy difficulty", () => {
        beforeEach(async () => {
            await driver.get("http://localhost:8081");
            const navigateToBath = await driver.findElement(By.xpath(HomePage.bathPage));
            navigateToBath.click();
            await driver.manage().setTimeouts({implicit: 10000});
            const easy = await driver.findElement(By.xpath(BathPage.easyDifficulty));
            easy.click();
        });

        it("plays the game scoring 0/3", async () => {
            await BathPage.playGame(driver, 0, 3);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 0/3");
        });

        it("plays the game scoring 1/3", async () => {
            await BathPage.playGame(driver, 1, 3);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 1/3");
        });

        it("plays the game scoring 2/3", async () => {
            await BathPage.playGame(driver, 2, 3);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 2/3");
        });

        it("plays the game scoring 3/3", async () => {
            await BathPage.playGame(driver, 3, 3);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 3/3");
        });
    });

    describe("play game at medium difficulty", () => {
        beforeEach(async () => {
            await driver.get("http://localhost:8081");
            const navigateToBath = await driver.findElement(By.xpath(HomePage.bathPage));
            navigateToBath.click();
            await driver.manage().setTimeouts({implicit: 10000});
            const medium = await driver.findElement(By.xpath(BathPage.mediumDifficulty));
            medium.click();
        });

        it("plays the game scoring 0/6", async () => {
            await BathPage.playGame(driver, 0, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 0/6");
        });

        it("plays the game scoring 1/6", async () => {
            await BathPage.playGame(driver, 1, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 1/6");
        });

        it("plays the game scoring 2/6", async () => {
            await BathPage.playGame(driver, 2, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 2/6");
        });

        it("plays the game scoring 3/6", async () => {
            await BathPage.playGame(driver, 3, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 3/6");
        });

        it("plays the game scoring 4/6", async () => {
            await BathPage.playGame(driver, 4, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 4/6");
        });

        it("plays the game scoring 5/6", async () => {
            await BathPage.playGame(driver, 5, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 5/6");
        });

        it("plays the game scoring 6/6", async () => {
            await BathPage.playGame(driver, 6, 6);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 6/6");
        });
    });

    describe("play game at hard difficulty", () => {
        beforeEach(async () => {
            await driver.get("http://localhost:8081");
            const navigateToBath = await driver.findElement(By.xpath(HomePage.bathPage));
            navigateToBath.click();
            await driver.manage().setTimeouts({implicit: 10000});
            const hard = await driver.findElement(By.xpath(BathPage.hardDifficulty));
            hard.click();
        });

        it("plays the game scoring 0/9", async () => {
            await BathPage.playGame(driver, 0, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 0/9");
        });

        it("plays the game scoring 1/9", async () => {
            await BathPage.playGame(driver, 1, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 1/9");
        });

        it("plays the game scoring 2/9", async () => {
            await BathPage.playGame(driver, 2, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 2/9");
        });

        it("plays the game scoring 3/9", async () => {
            await BathPage.playGame(driver, 3, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 3/9");
        });

        it("plays the game scoring 4/9", async () => {
            await BathPage.playGame(driver, 4, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 4/9");
        });

        it("plays the game scoring 5/9", async () => {
            await BathPage.playGame(driver, 5, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 5/9");
        });

        it("plays the game scoring 6/9", async () => {
            await BathPage.playGame(driver, 6, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 6/9");
        });

        it("plays the game scoring 7/9", async () => {
            await BathPage.playGame(driver, 7, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 7/9");
        });

        it("plays the game scoring 9/9", async () => {
            await BathPage.playGame(driver, 9, 9);
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.gameOverScore));
            expect(await questionElement.getText()).toBe("Your Score: 9/9");
        });
    });
});

class HomePage {
    static bathPage = "/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[1]";
}

class BathPage {
    static easyDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]";
    static mediumDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[2]";
    static hardDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[3]";
    static selectedDifficulty = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[4]";

    static question = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[5]/div";

    // Must add index to get a specific answer element [1 to 9]
    // E.g. append [1] to get the first answer available
    static answer = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[6]/div";

    static gameOverScore = "/html/body/div[1]/div/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div[2]";

    static async playGame(driver, score, total) {
        for (let i = 0; i < total; i++) {
            await driver.manage().setTimeouts({implicit: 10000});

            const questionElement = await driver.findElement(By.xpath(BathPage.question));
            const questionText = await questionElement.getText();

            let question;
            for (const flashcard of mockFlashcards) {
                if (flashcard.question === questionText) {
                    question = flashcard;
                    break;
                }
            }

            for (let j = 1; j < 10 - i; j++) {
                const answerElement = await driver.findElement(By.xpath(this.answer + "[" + j.toString() + "]"));
                const textElement = await answerElement.findElement(By.css("div"));
                const questionText = await textElement.getText();

                if (questionText.trim() === question.answer && score > 0) {
                    score--;
                    answerElement.click();
                    break;
                } else if ((questionText.trim() !== question.answer && score === 0) || 10 - i === 2) {
                    answerElement.click()
                    break;
                }
            }
        }
    }
}
