import { Browser, Builder, By } from "selenium-webdriver";

describe('the eat page', () => {
    let driver;
    let port = "http://localhost:19006/" // change port to the port your app is running on

    let eatlocation = "#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div.css-view-175oi2r.r-flexDirection-18u37iz.r-justifyContent-a2tzq0.r-marginBottom-117bsoe > div:nth-child(2)"

    beforeEach(async () => {
        // driver = await new Builder().forBrowser(Browser.EDGE).build();
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    it("navigates to the eat page", async () => {
        await driver.get(port);

        expect(await driver.getTitle()).toBe("Home");

        const navigateToEat = await driver.findElement(By.css(eatlocation));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        expect(await driver.getTitle()).toBe("Eat");
    });

    //  THIS ONLY PASSES WHEN THE PET IS FULL
    it("displays the 'You are full!' message", async () => {
        await driver.get(port);

        const navigateToEat = await driver.findElement(By.css(eatlocation));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });

        const fullMessage = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div"));
        expect(await fullMessage.getText()).toBe("You are full!");
    }, 20000);

    it("plays the minigame", async () => {
        await driver.get(port);

        const navigateToEat = await driver.findElement(By.css(eatlocation));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        let correctAnswer = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div.css-view-175oi2r.r-alignItems-1awozwy.r-backgroundColor-14lw9ot.r-borderRadius-1ylenci.r-boxShadow-1t5fnk.r-padding-1xutcf9.r-width-13qz1uu > div:nth-child(3)"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div.css-view-175oi2r.r-alignItems-1awozwy.r-backgroundColor-14lw9ot.r-borderRadius-1ylenci.r-boxShadow-1t5fnk.r-padding-1xutcf9.r-width-13qz1uu > div:nth-child(3)"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div.css-view-175oi2r.r-alignItems-1awozwy.r-backgroundColor-14lw9ot.r-borderRadius-1ylenci.r-boxShadow-1t5fnk.r-padding-1xutcf9.r-width-13qz1uu > div:nth-child(2)"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div.css-view-175oi2r.r-alignItems-1awozwy.r-backgroundColor-14lw9ot.r-borderRadius-1ylenci.r-boxShadow-1t5fnk.r-padding-1xutcf9.r-width-13qz1uu > div:nth-child(4)"));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        const hungerText = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div > div > div:nth-child(4) > div.css-text-146c3p1.r-fontFamily-1urcxra.r-fontSize-yy2aun.r-marginRight-7o8qx1"));
        expect(await hungerText.getText()).toBe("Hunger: 0");

        const happinessText = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div > div > div:nth-child(5) > div.css-text-146c3p1.r-fontFamily-1urcxra.r-fontSize-yy2aun.r-marginRight-7o8qx1"));
        expect(await happinessText.getText()).toBe("Happiness: 100");
    }, 20000);

    it("passes the minigame with 0/5", async () => {
        await driver.get(port);

        let defNotTheAns = "#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div.css-view-175oi2r.r-alignItems-1awozwy.r-backgroundColor-14lw9ot.r-borderRadius-1ylenci.r-boxShadow-1t5fnk.r-padding-1xutcf9.r-width-13qz1uu > div:nth-child(5)"

        const navigateToEat = await driver.findElement(By.css(eatlocation));
        navigateToEat.click();

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        let correctAnswer = await driver.findElement(By.css(defNotTheAns));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.css(defNotTheAns));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.css(defNotTheAns));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });

        correctAnswer = await driver.findElement(By.css(defNotTheAns));
        correctAnswer.click()

        await driver.manage().setTimeouts({ implicit: 1000 });
        // -----------------------------------------------------------------------------------------------
        const resultScoreText = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div > div > div.css-text-146c3p1.r-fontFamily-1urcxra.r-fontSize-yy2aun.r-marginBottom-eektet.r-marginRight-zso239.r-textAlign-q4m81j"));
        expect(await resultScoreText.getText()).toBe("You got 0 out of 4 correct!");

        const hungerText = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div > div > div:nth-child(4) > div.css-text-146c3p1.r-fontFamily-1urcxra.r-fontSize-yy2aun.r-marginRight-7o8qx1"));
        expect(await hungerText.getText()).toBe("Hunger: 0");

        const happinessText = await driver.findElement(By.css("#root > div > div > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div:nth-child(2) > div.css-view-175oi2r.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af.r-pointerEvents-12vffkv > div.css-view-175oi2r.r-flex-13awgt0.r-pointerEvents-12vffkv > div > div > div > div.css-view-175oi2r.r-flex-13awgt0 > div > div > div > div > div > div > div > div:nth-child(5) > div.css-text-146c3p1.r-fontFamily-1urcxra.r-fontSize-yy2aun.r-marginRight-7o8qx1"));
        expect(await happinessText.getText()).toBe("Happiness: 0");
    }, 20000);

    afterEach(async () => {
        await driver.quit();
    });
});