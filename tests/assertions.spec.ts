import {test, expect} from '@playwright/test';

test('assertions demo - to be visible- to be hidden', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await expect(page.locator('#finish')).toBeHidden();
    await page.locator('#start >button').click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#finish')).toBeVisible();

    await page.close();
})

test('assertions demo - to be present', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await expect(page.locator('[class="added-manually"]')).not.toHaveCount(1);
    await page.locator('.example > button').click();
    await expect(page.locator('[class="added-manually"]')).toHaveCount(1);

    await page.close();
})

test('assertions demo - to be enabled- disabled', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator('[type="text"]')).toBeDisabled();
    await page.locator('#input-example [type="button"]').click();
    await expect(page.locator('[type="text"]')).toBeEnabled();
    await expect(page.locator('p#message')).toHaveText('It\'s enabled!');
    await page.close();
})

test('assertions demo - to have text', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    await expect(page.locator('#input-example [type="button"]')).toHaveText('Enable');
    await expect(page.locator('#input-example [type="button"]')).not.toHaveText('Enabled');

    await page.close();
})

test('assertions demo - to have attribute', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    await expect(page.locator('#input-example [type="button"]')).toHaveAttribute('type', 'button', {timeout: 5000});
    await page.close();
})

test('assertions demo - to have url', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    // full url
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');
    // partial url
    await expect(page).toHaveURL(/dynamic_controls/);
    await page.close();
})

test('assertions demo - to have title', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    // full title
    await expect(page).toHaveTitle('The Internet');
    // partial title
    await expect(page).toHaveTitle(/Internet/);
    // another way to write partial title
    await expect(page).toHaveTitle(/The.*/);
    await page.close();
})

test('assertions demo - to have screenshot', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await page.setViewportSize({width: 1280, height: 720});
    await page.waitForTimeout(3000);
    await expect(page).toHaveScreenshot();
    await page.close();
})