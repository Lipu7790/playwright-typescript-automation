import { test, expect } from '../../fixtures/pages';
import { users } from '../../test-data/users';

test.describe('Login / authentication', () => {
  test('valid user can log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('locked out user sees error @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError('Sorry, this user has been locked out.');
  });

  test('invalid credentials are rejected @regression', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.expectError('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory/);
  });

  const requiredFieldCases = [
    { name: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
    { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
  ];

  for (const c of requiredFieldCases) {
    test(`form validation: ${c.name} @regression`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(c.username, c.password);
      await loginPage.expectError(c.error);
    });
  }

  test('user can log out @smoke', async ({ loggedIn, loginPage }) => {
    await loggedIn.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('protected page redirects to login when not authenticated @regression', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });
});
