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

        const addFlashCard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[1]/div"));
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

        const addFlashCard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[1]/div"));
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


        // Attempt to remove one of the flashcards
        const removeFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[2]/div"));
        removeFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const rmStudySet1 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        rmStudySet1.sendKeys("INSO");

        const rmQuestion1 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea"));
        rmQuestion1.sendKeys("What is OOP?");

        const remove1 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        remove1.click();
    
        await driver.manage().setTimeouts({ implicit: 1000 });

    
        // Add second flashcard
        addFlashCard.click();
        await driver.manage().setTimeouts({ implicit: 1000 });

        await driver.manage().setTimeouts({implicit: 1000});

        const secondStudySet = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        secondStudySet.sendKeys("INSO");
    
        const secondQuestion = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[1]"));
        secondQuestion.sendKeys("What is a class in OOP?");
    
        const secondAnswer = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[2]"));
        secondAnswer.sendKeys("Template definition of the methods and variables in a particular kind of object");
    
        const createSecond = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        createSecond.click();

        await driver.manage().setTimeouts({implicit: 1000});

    
        // Actually remove one of the flashcards
        removeFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const rmStudySet2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        rmStudySet2.sendKeys("INSO");

        const rmQuestion2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea"));
        rmQuestion2.sendKeys("What is a class in OOP?");

        const remove2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        remove2.click();
    
        await driver.manage().setTimeouts({ implicit: 1000 });

    });    

    it("removes all* flashcards", async () => {
        await driver.get("http://localhost:8081");

        const navigateToFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[3]"));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});


        // Create first study set
        const addFlashCard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[1]/div"));
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


        // Create second study set
        addFlashCard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const studySet2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        studySet2.sendKeys("MATE");

        const question2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[1]"));
        question2.sendKeys("What is an integer?");

        const answer2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[2]"));
        answer2.sendKeys("Not a fraction; a whole number");

        const create2 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        create2.click();

        // Create third study set
        addFlashCard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const studySet3 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        studySet3.sendKeys("QUIM");

        const question3 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[1]"));
        question3.sendKeys("What is chemistry?");

        const answer3 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea[2]"));
        answer3.sendKeys("Study of the interactions of matter with other matter and with energy");

        const create3 = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        create3.click();

        await driver.manage().setTimeouts({implicit: 1000});

        // Remove all* flashcards
        const removeFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[2]/div"));
        removeFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const removeAllFlashcards = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[3]/div"));
        removeAllFlashcards.click();

        await driver.manage().setTimeouts({implicit: 1000});
    
    });
    

    it("scrolls through flashcard page overflow", async () => {
        await driver.get("http://localhost:8081");

        const navigateToFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[3]"));
        navigateToFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        const addFlashCard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[1]/div"));
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

        const removeFlashcard = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[3]/div[2]/div"));
        removeFlashcard.click();

        await driver.manage().setTimeouts({implicit: 1000});

        studySet = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/input"));
        studySet.sendKeys("INSO");

        question = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/textarea"));
        question.sendKeys("What is OOP?");

        await driver.executeScript("arguments[0].scrollIntoView();", studySet);
        await driver.sleep(1000);

        await driver.executeScript("window.scrollTo(0, 0);");
        await driver.sleep(1000);

        const isAtTopAfterScroll = await driver.executeScript("return (window.pageYOffset === 0)");
        expect(isAtTopAfterScroll).toBe(true);

        const remove = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]"));
        remove.click();

        await driver.manage().setTimeouts({implicit: 1000});

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