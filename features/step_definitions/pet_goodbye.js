const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { Browser, Builder, By } = require("selenium-webdriver");
const { expect } = require("expect");

let driver;

Before(async () => {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
});

After(async () => {
    await driver.quit();
});

Given("the user is on the Pet Goodbye Page", async () => {
    await driver.get("http://localhost:8081/pet-goodbye"); // Adjust URL as needed
});

When("the user interacts with the pet", async () => {
    const petImage = await driver.findElement(By.xpath(PetGoodbyePage.petImageXPath));
    petImage.click();
});

Then("the pet's image changes", async () => {
    const petImage = await driver.findElement(By.xpath(PetGoodbyePage.petImageXPath));
    // Verify that the pet image has changed by checking its source or any other attribute
    expect(await petImage.getAttribute('src')).not.toBe(PetGoodbyePage.initialPetImageSource);
});

Then("the goodbye message is displayed", async () => {
    const goodbyeMessage = await driver.findElement(By.xpath(PetGoodbyePage.goodbyeMessageXPath));
    expect(await goodbyeMessage.isDisplayed()).toBeTruthy();
});


Given('I navigate to the Pet Goodbye page', async () => {
  await driver.get("http://localhost:8081/pet-goodbye"); // Adjust URL as needed
});

Then('I should see the Pet Goodbye component', async () => {
  // Implement logic to verify the presence of the Pet Goodbye component
  // You can find elements and assert their presence using Selenium
  // Example:
  const petImage = await driver.findElement(By.xpath("/xpath/to/pet/image"));
  expect(await petImage.isDisplayed()).toBeTruthy();
});

When('I click on the button', async () => {
  // Implement logic to click on a button within the Pet Goodbye component
  // Example:
  const button = await driver.findElement(By.xpath("/xpath/to/button"));
  button.click();
});

Then('I should see the next text box image', async () => {
  // Implement logic to verify the change in the text box image
  // Example:
  const nextTextBoxImage = await driver.findElement(By.xpath("/xpath/to/next/text/box/image"));
  expect(await nextTextBoxImage.isDisplayed()).toBeTruthy();
});

Then('I should see the initial state of the Pet Goodbye component', async () => {
  // Implement logic to verify the initial state of the Pet Goodbye component
  // This could involve checking the initial image, text, or any other state
  // Example:
  const initialPetImage = await driver.findElement(By.xpath("/xpath/to/initial/pet/image"));
  expect(await initialPetImage.isDisplayed()).toBeTruthy();
});

class PetGoodbyePage {
    static petImageXPath = "/xpath/to/pet/image"; // Adjust XPaths accordingly
    static noButtonXPath = "/xpath/to/no/button";
    static yesButtonXPath = "/xpath/to/yes/button";
    static goodbyeMessageXPath = "/xpath/to/goodbye/message";
    static initialPetImageSource = "initial_pet_image_source.jpg"; // Initial pet image source
}
