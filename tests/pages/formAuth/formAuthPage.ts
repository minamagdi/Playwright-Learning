import { Locator, Page } from '@playwright/test';
import BasePage from '../basePage';

export default class FormAuthPage extends BasePage {
    // Locators
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly successMessage: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: /Login/ });
        this.successMessage = page.locator('div.alert.alert-success');
        this.errorMessage = page.locator('div.alert.alert-danger');
    }

    // Actions
    public async navigateToLoginPage() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    public async fillUsername(username: string) {
        await this.typeText(this.usernameField, username);
    }

    public async fillPassword(password: string) {
        await this.typeText(this.passwordField, password);
    }

    public async clickLoginButton() {
        await this.clickOnElement(this.loginButton);
    }

    public async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    // Assertions
    public async getSuccessMessage(): Promise<string> {
        await this.successMessage.waitFor({ state: 'visible' });
        return await this.successMessage.textContent() || '';
    }

    public async getErrorMessage(): Promise<string> {
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.textContent() || '';
    }

    public async isSuccessMessageVisible() {
        return await this.successMessage.isVisible();
    }

    public async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }
}
