import {Browser, Builder, By} from "selenium-webdriver"
import {NoSuchElementError} from "selenium-webdriver/lib/error";

describe('the flashcards page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the flashcards page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToFlashcard = await driver.findElement(By.xpath(HomePage.flashcards));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        expect(await driver.getTitle()).toBe("Flashcards");
    });

    it("creates a flashcard", async () => {
        await driver.get("http://localhost:8081");

        const navigateToFlashcard = await driver.findElement(By.xpath(HomePage.flashcards));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const addFlashCard = await driver.findElement(By.xpath(FlashcardsPage.addFlashcard));
        addFlashCard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const studySet = await driver.findElement(By.xpath(FlashcardsPage.studySetInput));
        studySet.sendKeys("INSO");

        const question = await driver.findElement(By.xpath(FlashcardsPage.addFlashcardQuestionInput));
        question.sendKeys("What is OOP?");

        const answer = await driver.findElement(By.xpath(FlashcardsPage.answerInput));
        answer.sendKeys("Object Oriented Programming");

        const create = await driver.findElement(By.xpath(FlashcardsPage.createButton));
        create.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const flashcardTextQuestionSide = await driver.findElement(By.xpath(FlashcardsPage.flashcardQuestion));
        expect(await flashcardTextQuestionSide.getText()).toBe("What is OOP?");

        flashcardTextQuestionSide.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const flashcardTextAnswerSide = await driver.findElement(By.xpath(FlashcardsPage.flashcardQuestion));
        expect(await flashcardTextAnswerSide.getText()).toBe("Object Oriented Programming");
    });

    it("removes a flashcard", async () => {
        await driver.get("http://localhost:8081");

        const navigateToFlashcard = await driver.findElement(By.xpath(HomePage.flashcards));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const addFlashCard = await driver.findElement(By.xpath(FlashcardsPage.addFlashcard));
        addFlashCard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        let studySet = await driver.findElement(By.xpath(FlashcardsPage.studySetInput));
        studySet.sendKeys("INSO");

        let question = await driver.findElement(By.xpath(FlashcardsPage.addFlashcardQuestionInput));
        question.sendKeys("What is OOP?");

        const answer = await driver.findElement(By.xpath(FlashcardsPage.answerInput));
        answer.sendKeys("Object Oriented Programming");

        const create = await driver.findElement(By.xpath(FlashcardsPage.createButton));
        create.click();

        const removeFlashcard = await driver.findElement(By.xpath(FlashcardsPage.removeFlashcard));
        removeFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        studySet = await driver.findElement(By.xpath(FlashcardsPage.studySetInput));
        studySet.sendKeys("INSO");

        question = await driver.findElement(By.xpath(FlashcardsPage.removeFlashcardQuestionInput));
        question.sendKeys("What is OOP?");

        const remove = await driver.findElement(By.xpath(FlashcardsPage.createButton));
        remove.click();

        await driver.manage().setTimeouts({implicit: 1000});

        try {
            await driver.findElement(By.xpath(FlashcardsPage.flashcardQuestion))
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

class HomePage {
    static flashcards = "/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[3]";
}

class FlashcardsPage {
    static addFlashcard = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]";
    static removeFlashcard = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]";

    static studySetInput = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input";
    static answerInput = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[2]";
    static createButton = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]";

    static addFlashcardQuestionInput = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[1]";
    static removeFlashcardQuestionInput = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea";

    static flashcardQuestion = "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/div";
}
