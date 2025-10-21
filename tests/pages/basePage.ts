import {Locator, Page} from '@playwright/test';

export default class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // actions

    protected async clickOnElement(element: Locator) {
        await element.click();
    }

    protected async typeText(element: Locator, text: string) {
        await element.fill(text);
    }

    public async takeScreenShot(filePath : string) {
        await this.page.screenshot({ path: filePath });
    }

}