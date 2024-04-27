import { Browser, Builder } from "selenium-webdriver";
import { getElementById } from "./utils/seleniumTestUtils";
import { allShopCategories, allShopItems } from "../utils/shopAssets";

describe('Pet Shop feature - UI testing', () => {
    let driver;
    let location = "http://localhost:8081/" // change port to the port your app is running on

    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("Pet Shop categories are displayed", async () => {
        await driver.get(location);

        const petShopButton = await getElementById(driver, 'pet-shop-button');

        expect(petShopButton).not.toBeNull();
        petShopButton.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        for (const category of allShopCategories) {
            const categoryButton = await getElementById(driver, `shop-category-${category}`);

            expect(categoryButton).not.toBeNull();
        }
    });

    it("Pet Shop categories filter item list", async () => {
        await driver.get(location);

        const petShopButton = await getElementById(driver, 'pet-shop-button');

        expect(petShopButton).not.toBeNull();
        petShopButton.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        for (const category of allShopCategories) {
            const categoryButton = await getElementById(driver, `shop-category-${category}`);
            expect(categoryButton).not.toBeNull();
            categoryButton.click();

            await driver.manage().setTimeouts({ implicit: 1000 });

            const allCategoryItems = allShopItems.filter(item => item.category === category);
            for (const item of allCategoryItems) {
                const shopItem = await getElementById(driver, `shop-item-${item.id}`);
                expect(shopItem).not.toBeNull();
            }
        }
    });

    it("Pet Shop buyable items are displayed", async () => {
        await driver.get(location);

        const petShopButton = await getElementById(driver, 'pet-shop-button');

        expect(petShopButton).not.toBeNull();
        petShopButton.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        for (const item of allShopItems) {
            const shopItem = await getElementById(driver, `shop-item-${item.id}`);
            expect(shopItem).not.toBeNull();

            const itemName = await getElementById(driver, `shop-item-${item.id}-name`);
            expect(itemName).not.toBeNull();
            expect(await itemName.getText()).toBe(item.name);

            const itemCost = await getElementById(driver, `shop-item-${item.id}-cost`);
            expect(itemCost).not.toBeNull();
            expect(await itemCost.getText()).toBe(item.cost.toString());
        }
    });

    it("Pet Shop study points deducted when item bought", async () => {
        await driver.get(location);

        const petShopButton = await getElementById(driver, 'pet-shop-button');

        expect(petShopButton).not.toBeNull();
        petShopButton.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        let points = await getElementById(driver, 'shop-study-points');
        expect(points).not.toBeNull();
        expect(await points.getText()).toBe('500');

        const item = allShopItems[0];
        const shopItem = await getElementById(driver, `shop-item-${item.id}`);
        expect(shopItem).not.toBeNull();
        shopItem.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        points = await getElementById(driver, 'shop-study-points');
        let pointsValue = parseInt(await points.getText());
        expect(pointsValue).toBe(500-item.cost);
    });

    it("Pet Shop study points reset", async () => {
        await driver.get(location);

        const petShopButton = await getElementById(driver, 'pet-shop-button');

        expect(petShopButton).not.toBeNull();
        petShopButton.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        let points = await getElementById(driver, 'shop-study-points');
        expect(points).not.toBeNull();
        expect(await points.getText()).toBe('500');

        const pointResetButton = await getElementById(driver, 'shop-reset-points-button');
        expect(pointResetButton).not.toBeNull();
        pointResetButton.click();

        points = await getElementById(driver, 'shop-study-points');
        expect(points).not.toBeNull();
        expect(await points.getText()).toBe('999');
    });

    afterEach(async () => {
        await driver.quit();
    });
});