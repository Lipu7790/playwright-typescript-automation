import { test, expect, type APIRequestContext } from '@playwright/test';
import { apiAdmin, newBooking, updatedBooking, type Booking } from '../../test-data/booking';

interface CreateBookingResponse {
  bookingid: number;
  booking: Booking;
}

async function getToken(request: APIRequestContext): Promise<string> {
  const res = await request.post('/auth', { data: apiAdmin });
  expect(res.status()).toBe(200);
  const body = (await res.json()) as { token?: string };
  expect(body.token, 'auth token should be returned').toBeTruthy();
  return body.token as string;
}

test.describe.serial('Restful Booker API: booking CRUD', () => {
  let token: string;
  let bookingId: number;

  test.beforeAll(async ({ request }) => {
    token = await getToken(request);
  });

  test('health check returns 201 @smoke', async ({ request }) => {
    const res = await request.get('/ping');
    expect(res.status()).toBe(201);
  });

  test('CREATE booking @smoke', async ({ request }) => {
    const res = await request.post('/booking', { data: newBooking });
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');

    const body = (await res.json()) as CreateBookingResponse;
    expect(typeof body.bookingid).toBe('number');
    expect(body.booking).toMatchObject(newBooking);
    bookingId = body.bookingid;
  });

  test('READ booking by id @regression', async ({ request }) => {
    const res = await request.get(`/booking/${bookingId}`);
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(newBooking);
  });

  test('UPDATE booking with token @regression', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      data: updatedBooking,
      headers: { Cookie: `token=${token}` },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as Booking;
    expect(body.totalprice).toBe(updatedBooking.totalprice);
    expect(body.additionalneeds).toBe(updatedBooking.additionalneeds);
  });

  test('UPDATE without token is forbidden (negative) @regression', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, { data: updatedBooking });
    expect(res.status()).toBe(403);
  });

  test('DELETE booking with token @regression', async ({ request }) => {
    const res = await request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(res.status()).toBe(201);

    const after = await request.get(`/booking/${bookingId}`);
    expect(after.status()).toBe(404);
  });
});

test.describe('Restful Booker API: negative scenarios', () => {
  test('auth with wrong password returns no token @regression', async ({ request }) => {
    const res = await request.post('/auth', { data: { username: 'admin', password: 'wrong' } });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ reason: 'Bad credentials' });
  });

  test('READ non-existing booking returns 404 @regression', async ({ request }) => {
    const res = await request.get('/booking/999999999');
    expect(res.status()).toBe(404);
  });
});
