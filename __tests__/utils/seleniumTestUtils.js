import { By } from "selenium-webdriver";

const getElementById = async (driver, id) => {
    try {
        return await driver.findElement(By.id(id));
    } catch (error) {
        return null;
    }
};

export {
    getElementById,
};
