import BasePage from '../basePage';

export default class LoginPage extends BasePage {
    // locators
    protected readonly userNameField = this.page.locator("#user-name");
    protected readonly passwordField = this.page.locator("#password");
    protected readonly loginButton = this.page.locator("#login-button");

    // actions
    async enterUserName(userName: string) {
        await this.typeText(this.userNameField, userName);
    }

    async enterPassword(password: string) {
        await this.typeText(this.passwordField, password);
    }

    async clickLoginButton() {
        await this.clickOnElement(this.loginButton);
    }
}