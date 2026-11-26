import { test, expect } from '../../fixtures/pages';
import { products } from '../../test-data/users';

test.describe('Inventory: sorting and cart (CRUD-style)', () => {
  test('sort products by name Z to A @regression', async ({ loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await loggedIn.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('sort products by price low to high @regression', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort products by price high to low @regression', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('add and remove items updates cart badge @smoke', async ({ loggedIn }) => {
    await loggedIn.addToCart(products.backpack);
    await expect(loggedIn.cartBadge).toHaveText('1');

    await loggedIn.addToCart(products.bikeLight);
    await expect(loggedIn.cartBadge).toHaveText('2');

    await loggedIn.removeFromCart(products.backpack);
    await expect(loggedIn.cartBadge).toHaveText('1');

    await loggedIn.removeFromCart(products.bikeLight);
    await expect(loggedIn.cartBadge).toBeHidden();
  });

  test('cart keeps selected items @regression', async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(products.backpack);
    await loggedIn.addToCart(products.boltTShirt);
    await loggedIn.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItems([products.backpack, products.boltTShirt]);
  });
});
