import { test, expect } from '../../fixtures/pages';
import { checkoutInfo, products } from '../../test-data/users';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(products.backpack);
    await loggedIn.addToCart(products.bikeLight);
    await loggedIn.openCart();
    await cartPage.checkout();
  });

  test('complete end-to-end purchase @smoke', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation(checkoutInfo);

    const { itemTotal, tax, total } = await checkoutPage.getSummary();
    expect(itemTotal).toBeCloseTo(29.99 + 9.99, 2);
    expect(total).toBeCloseTo(itemTotal + tax, 2);

    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  const missingFieldCases = [
    { field: 'first name', info: { ...checkoutInfo, firstName: '' }, error: 'First Name is required' },
    { field: 'last name', info: { ...checkoutInfo, lastName: '' }, error: 'Last Name is required' },
    { field: 'postal code', info: { ...checkoutInfo, postalCode: '' }, error: 'Postal Code is required' },
  ];

  for (const c of missingFieldCases) {
    test(`form validation: missing ${c.field} @regression`, async ({ checkoutPage }) => {
      await checkoutPage.fillInformation(c.info);
      await expect(checkoutPage.errorMessage).toContainText(c.error);
    });
  }
});
