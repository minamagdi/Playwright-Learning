import { expect } from '@playwright/test';
import BasePage from '../basePage';
export default class ProductPage extends BasePage {
    // locators
    protected readonly backpackAddToCartButton = this.page.locator('#add-to-cart-sauce-labs-backpack');
    protected readonly cartButton = this.page.locator('[data-test="shopping-cart-link"]');
    protected readonly addedElementToCart = this.page.locator('.cart_item_label');



    // actions
    async clickOnBackpackAddToCartButton() {
        await this.clickOnElement(this.backpackAddToCartButton);
    }

    async clickOnCartButton() {
        await this.clickOnElement(this.cartButton);
    }

    async verifyProductAddedToCart() {
        await expect(this.addedElementToCart).toBeVisible();
    }

}