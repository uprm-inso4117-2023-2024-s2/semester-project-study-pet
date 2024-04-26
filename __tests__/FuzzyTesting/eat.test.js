import {Browser, Builder, By} from "selenium-webdriver"

describe('the eat page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the eat page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToEat = await driver.findElement(By.xpath(HomePage.flashcards));
        navigateToEat.click();

        await driver.manage().setTimeouts({implicit: 1000});

        expect(await driver.getTitle()).toBe("Eat");
    });

    afterEach(async () => {
        await driver.quit();
    });
});

class HomePage {
    static flashcards = "/html/body/div[1]/div/div/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div[3]/div[2]";
}
