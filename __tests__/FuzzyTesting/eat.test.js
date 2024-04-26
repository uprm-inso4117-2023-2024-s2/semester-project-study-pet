import {Browser, Builder, By} from "selenium-webdriver"

describe('the eat page', () => {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the eat page", async () => {
        await driver.get("http://localhost:8081");

        expect(await driver.getTitle()).toBe("Home");

        const navigateToEat = await driver.findElement(By.xpath(HomePage.eat));
        navigateToEat.click();

        await driver.manage().setTimeouts({implicit: 1000});

        expect(await driver.getTitle()).toBe("Eat");
    });

    afterEach(async () => {
        await driver.quit();
    });
});

class HomePage {
    static eat = "//*[@id=\"pet-eat-button\"]";
}
