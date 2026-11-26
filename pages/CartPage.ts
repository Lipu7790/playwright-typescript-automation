import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectItems(names: string[]): Promise<void> {
    await expect(this.cartItems).toHaveCount(names.length);
    for (const name of names) {
      await expect(this.cartItems.filter({ hasText: name })).toBeVisible();
    }
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
