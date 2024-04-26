// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Browser, Builder } from "selenium-webdriver";
import { getElementById } from "./utils/seleniumTestUtils";


describe('Pet Sleep feature - UI testing', () => {
    let driver;
    let location = "http://localhost:8081/" // change port to the port your app is running on

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        jest.useFakeTimers('modern');
    }, 5000);


    it("Pet is awake, no 'Pet is asleep' message displayed", async () => {
        const currentTime = new Date();
        currentTime.setHours(12);
        jest.setSystemTime(new Date(currentTime.toISOString()));

        await driver.get(location);

        const petAsleepMessage = await getElementById(driver, 'pet-asleep-message');

        expect(petAsleepMessage).toBeNull();
    });

    it("Pet is asleep, 'Pet is asleep' message is displayed", async () => {
        const currentTime = new Date();
        currentTime.setHours(1);
        jest.setSystemTime(new Date(currentTime.toISOString()));

        await driver.get(location);

        await driver.manage().setTimeouts({ implicit: 1000 });

        const petAsleepMessage = await getElementById(driver, 'pet-asleep-message');

        expect(petAsleepMessage).not.toBeNull();
        expect(await petAsleepMessage.getText()).toBe('Your pet is asleep Zz');
    }, 3000);

    afterEach(async () => {
        await driver.quit();
        jest.clearAllMocks();
        jest.useRealTimers();
    });
});