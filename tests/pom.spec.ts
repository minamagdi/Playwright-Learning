import {test, expect} from '../fixtures/fixture';
import * as testData from '../testData/testData.json';

test('POM demo - login and add to cart @smoke', async ({page, loginPage, productPage})=> {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUserName(testData.userName);
    await loginPage.enterPassword(testData.password);
    await loginPage.takeScreenShot('./tests/screenshots/loginPage1.png');
    await loginPage.clickLoginButton();

    await productPage.clickOnBackpackAddToCartButton();
    await loginPage.takeScreenShot('./tests/screenshots/productPage1.png');
    await productPage.clickOnCartButton();

    await productPage.verifyProductAddedToCart();
    await loginPage.takeScreenShot('./tests/screenshots/cartPage1.png');
})

test('POM demo - login and add to cart2 @smoke', async ({page, loginPage, productPage})=> {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUserName(testData.userName);
    await loginPage.enterPassword(testData.password);
    await loginPage.takeScreenShot('./tests/screenshots/loginPage1.png');
    await loginPage.clickLoginButton();

    await productPage.clickOnBackpackAddToCartButton();
    await loginPage.takeScreenShot('./tests/screenshots/productPage1.png');
    await productPage.clickOnCartButton();

    await productPage.verifyProductAddedToCart();

    await loginPage.takeScreenShot('./tests/screenshots/cartPage1.png');
})