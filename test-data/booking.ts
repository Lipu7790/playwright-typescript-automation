// Typed test data for the Restful Booker API
export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
};

export const newBooking: Booking = {
  firstname: 'Motiur',
  lastname: 'Lipu',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Breakfast',
};

export const updatedBooking: Booking = {
  ...newBooking,
  totalprice: 220,
  additionalneeds: 'Late checkout',
};

// Public demo credentials documented by Restful Booker
export const apiAdmin = { username: 'admin', password: 'password123' };
