import { test, expect } from '@playwright/test';


test('test code gen example', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('Welcome to the-internet 1');
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  await page.getByRole('heading', { name: 'Login Page' }).click();
  await expect(page.locator('h2')).toContainText('Login Page');
  await page.getByText('Username', { exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  await expect(page.locator('i')).toContainText('Login');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
  await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('test my self on the locators', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator(".login_logo")).toBeVisible();
  await page.locator('input[placeholder="Username"][id="user-name"]').fill('standard_user');
  await page.locator('input[placeholder="Password"],[id="password"]').fill('secret_sauce');
  // await page.locator('input[id="login-button"]').click(); // using all value
  // await page.locator('input[id^="login"]').click();  // using starting value
  // await page.locator('input[id$="button"]').click(); // using ending value
  await page.locator('input[id*="ogin-bu"]').click(); // using containing value

  await expect(page.locator('.title')).toHaveText('Products');

})