import { Browser, Builder } from "selenium-webdriver";
import { getElementById } from "./utils/seleniumTestUtils";

/**
 * NOTE: These test only work if the pet is asleep.
 * Due to the feature not fully implemented, the pet is always awake except the 
 * time between 23:00 and 07:00 of the next day. In order to execute the tests and have them passing,
 * you must un comment the lines in loadSleep() and loadSleepTime() functions defined in sleepScheduleStorage-test.js.
 * 
 */
describe('Pet Sleep feature - UI testing', () => {
    let driver;
    let location = "http://localhost:8081/" // change port to the port your app is running on

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("Pet is asleep, 'Pet is asleep' message is displayed", async () => {
        await driver.get(location);

        await driver.manage().setTimeouts({ implicit: 1000 });

        const petAsleepMessage = await getElementById(driver, 'pet-asleep-message');

        expect(petAsleepMessage).not.toBeNull();
        expect(await petAsleepMessage.getText()).toBe('Your pet is asleep Zz');
    }, 3000);

    it.each([
        'bath',
        'eat',
        'play',
        'stats',
    ])("Pet is asleep, action button is locked", async (action) => {
        await driver.get(location);

        await driver.manage().setTimeouts({ implicit: 1000 });

        const button = await getElementById(driver, `pet-${action}-button`);
        expect(button).not.toBeNull();
        button.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        const petAsleepMessage = await getElementById(driver, 'pet-asleep-message');

        expect(petAsleepMessage).not.toBeNull();
    }, 7000);

    afterEach(async () => {
        await driver.quit();
        jest.clearAllMocks();
        jest.useRealTimers();
    });
});