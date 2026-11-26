// Public demo credentials published on https://www.saucedemo.com
export interface User {
  username: string;
  password: string;
}

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'wrong_password' },
} satisfies Record<string, User>;

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const checkoutInfo: CheckoutInfo = {
  firstName: 'Motiur',
  lastName: 'Rahman',
  postalCode: '1213',
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
} as const;
