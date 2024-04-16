import {Browser, Builder, By} from "selenium-webdriver"
import {NoSuchElementError} from "selenium-webdriver/lib/error";

describe('the flashcards page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build(); // why is this set up for firefox, it should be a universal browser???
    });

    it("navigates to the flashcards page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[3]"));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        expect(await driver.getTitle()).toBe("Flashcards");
    });

    it("creates a flashcard", async () => {
        await driver.get("http://localhost:8081");

        const navigateToFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[3]"));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const addFlashCard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]"));
        addFlashCard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const studySet = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        studySet.sendKeys("INSO");

        const question = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[1]"));
        question.sendKeys("What is OOP?");

        const answer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[2]"));
        answer.sendKeys("Object Oriented Programming");

        const create = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        create.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const flashcardTextQuestionSide = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/div"));
        expect(await flashcardTextQuestionSide.getText()).toBe("What is OOP?");

        flashcardTextQuestionSide.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const flashcardTextAnswerSide = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/div"));
        expect(await flashcardTextAnswerSide.getText()).toBe("Object Oriented Programming");
    });

    it("removes a flashcard", async () => {
        await driver.get("http://localhost:8081");

        const navigateToFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[3]"));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const addFlashCard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]"));
        addFlashCard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        let studySet = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        studySet.sendKeys("INSO");

        let question = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[1]"));
        question.sendKeys("What is OOP?");

        const answer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[2]"));
        answer.sendKeys("Object Oriented Programming");

        const create = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        create.click();

        const removeFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]"));
        removeFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        studySet = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        studySet.sendKeys("INSO");

        question = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea"));
        question.sendKeys("What is OOP?");

        const remove = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        remove.click();

        await driver.manage().setTimeouts({implicit: 1000});

        try {
            await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/div"))
            throw new Error("Flashcard should not exist!");
        } catch (e) {
            if (!(e instanceof NoSuchElementError)) {
                throw new Error("Flashcard should not exist!");
            }
        }
    });

    afterEach(async () => {
        await driver.quit();
    });
});

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
