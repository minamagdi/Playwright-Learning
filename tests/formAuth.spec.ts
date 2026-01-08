import { test, expect } from '@playwright/test';
import FormAuthPage from './pages/formAuth/formAuthPage';

test.describe('Form Authentication Tests', () => {
    let formAuthPage: FormAuthPage;

    test.beforeEach(async ({ page }) => {
        formAuthPage = new FormAuthPage(page);
        await formAuthPage.navigateToLoginPage();
    });

    test('Should login successfully with correct credentials', async ({ page }) => {
        // Arrange
        const username = 'tomsmith';
        const password = 'SuperSecretPassword!';

        // Act
        await formAuthPage.loginWithCredentials(username, password);

        // Assert
        await formAuthPage.isSuccessMessageVisible();
        

        const successMessage = await formAuthPage.getSuccessMessage();
        expect(successMessage).toContain('You logged into a secure area!');

        // Verify URL changed to secure area
        expect(page.url()).toContain('/secure');
    });

    test('Should show error message with incorrect username', async () => {
        // Arrange
        const username = 'invaliduser';
        const password = 'SuperSecretPassword!';

        // Act
        await formAuthPage.loginWithCredentials(username, password);

        // Assert
        const errorMessageVisible = await formAuthPage.isErrorMessageVisible();
        expect(errorMessageVisible).toBeTruthy();

        const errorMessage = await formAuthPage.getErrorMessage();
        expect(errorMessage).toContain('Your username is invalid!');
    });

    test('Should show error message with incorrect password', async () => {
        // Arrange
        const username = 'tomsmith';
        const password = 'WrongPassword123';

        // Act
        await formAuthPage.loginWithCredentials(username, password);

        // Assert
        const errorMessageVisible = await formAuthPage.isErrorMessageVisible();
        expect(errorMessageVisible).toBeTruthy();

        const errorMessage = await formAuthPage.getErrorMessage();
        expect(errorMessage).toContain('Your password is invalid!');
    });

    test('Should show error message with both incorrect credentials', async () => {
        // Arrange
        const username = 'invaliduser';
        const password = 'WrongPassword123';

        // Act
        await formAuthPage.loginWithCredentials(username, password);

        // Assert
        const errorMessageVisible = await formAuthPage.isErrorMessageVisible();
        expect(errorMessageVisible).toBeTruthy();

        const errorMessage = await formAuthPage.getErrorMessage();
        expect(errorMessage).toContain('Your username is invalid!');
    });
});
