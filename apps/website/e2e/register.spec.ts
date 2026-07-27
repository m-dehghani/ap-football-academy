import { test, expect, Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function goToRegister(page: Page) {
  await page.goto('/register');
  await page.waitForLoadState('networkidle');
}

/** Fill every required field for an adult (18-25) registration. */
async function fillValidAdultForm(page: Page) {
  // Personal info
  await page.fill('input[name="firstName"]', 'علی');
  await page.fill('input[name="lastName"]', 'رضایی');
  await page.fill('input[name="email"]', 'ali.rezaei@test.com');
  await page.fill('input[name="phone"]', '09123456789');
  await page.fill('input[name="dateOfBirth"]', '1995-06-15');
  await page.selectOption('select[name="ageGroup"]', '18-25');

  // Program section appears after age group selection
  await page.selectOption('select[name="program"]', 'adult-recreational');
  await page.selectOption('select[name="experience"]', 'intermediate');

  // Emergency contact
  await page.fill('input[name="emergencyContactName"]', 'محمد رضایی');
  await page.fill('input[name="emergencyContact"]', '09111111111');

  // Terms checkbox
  await page.check('input[name="terms"]');
}

/** Fill every required field for a youth (8-12) registration (adds parent section). */
async function fillValidYouthForm(page: Page) {
  await page.fill('input[name="firstName"]', 'دانیال');
  await page.fill('input[name="lastName"]', 'احمدی');
  await page.fill('input[name="email"]', 'danial.ahmadi@test.com');
  await page.fill('input[name="phone"]', '09129999888');
  await page.fill('input[name="dateOfBirth"]', '2015-03-20');
  await page.selectOption('select[name="ageGroup"]', '8-12');

  await page.selectOption('select[name="program"]', 'youth-basic');
  await page.selectOption('select[name="experience"]', 'beginner');

  // Parent section (visible for minors)
  await page.fill('input[name="parentName"]', 'حسن احمدی');
  await page.fill('input[name="parentEmail"]', 'hasan.ahmadi@test.com');

  await page.fill('input[name="emergencyContactName"]', 'حسن احمدی');
  await page.fill('input[name="emergencyContact"]', '09133333333');

  await page.check('input[name="terms"]');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('صفحه ثبت نام - Register Page', () => {

  // ── 1. Page loads ──────────────────────────────────────────────────────────
  test('باید صفحه ثبت نام بارگذاری شود', async ({ page }) => {
    await goToRegister(page);

    await expect(page).toHaveTitle(/ثبت نام/);
    await expect(page.getByRole('heading', { name: /به باشگاه/ })).toBeVisible();
    await expect(page.getByText('اطلاعات شخصی')).toBeVisible();
  });

  // ── 2. Navigation from header ──────────────────────────────────────────────
  test('باید از دکمه ثبت نام در هدر به صفحه ثبت نام برود', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click the "ثبت نام" button in the header (desktop nav)
    const registerLink = page.locator('header').getByRole('link', { name: 'ثبت نام' }).first();
    await registerLink.click();

    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByText('اطلاعات شخصی')).toBeVisible();
  });

  // ── 3. Required field validation on empty submit ───────────────────────────
  test('باید خطاهای validation را برای فرم خالی نشان دهد', async ({ page }) => {
    await goToRegister(page);

    await page.click('button[type="submit"]');

    // At least two required-field errors should appear
    const errors = page.locator('p.text-red-600');
    await expect(errors.first()).toBeVisible();
    const count = await errors.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  // ── 4. Email validation ────────────────────────────────────────────────────
  test('باید ایمیل نامعتبر را رد کند', async ({ page }) => {
    await goToRegister(page);

    await page.fill('input[name="firstName"]', 'علی');
    await page.fill('input[name="lastName"]', 'رضایی');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.fill('input[name="phone"]', '09123456789');
    await page.fill('input[name="dateOfBirth"]', '1995-06-15');

    await page.click('button[type="submit"]');

    const emailError = page.locator('p.text-red-600').filter({ hasText: /email|ایمیل/i });
    await expect(emailError).toBeVisible();
  });

  // ── 5. Phone length validation ─────────────────────────────────────────────
  test('باید شماره تلفن کمتر از ۱۰ رقم را رد کند', async ({ page }) => {
    await goToRegister(page);

    await page.fill('input[name="firstName"]', 'علی');
    await page.fill('input[name="lastName"]', 'رضایی');
    await page.fill('input[name="email"]', 'ali@test.com');
    await page.fill('input[name="phone"]', '0912');    // too short
    await page.fill('input[name="dateOfBirth"]', '1995-06-15');

    await page.click('button[type="submit"]');

    const phoneError = page.locator('p.text-red-600').filter({ hasText: /phone|تلفن/i });
    await expect(phoneError).toBeVisible();
  });

  // ── 6. Age group drives program options ───────────────────────────────────
  test('باید بعد از انتخاب گروه سنی، برنامه‌های مرتبط نمایش داده شوند', async ({ page }) => {
    await goToRegister(page);

    // Program select should not exist yet
    await expect(page.locator('select[name="program"]')).not.toBeVisible();

    await page.selectOption('select[name="ageGroup"]', '18-25');

    // Now it should appear
    const programSelect = page.locator('select[name="program"]');
    await expect(programSelect).toBeVisible();

    // Should contain adult program options
    const options = await programSelect.locator('option').allTextContents();
    const hasAdultOption = options.some(o => /بزرگسالان|تفریحی|رقابتی/.test(o));
    expect(hasAdultOption).toBe(true);
  });

  // ── 7. Minor shows parent section ─────────────────────────────────────────
  test('باید برای سنین زیر ۱۸ سال، بخش اطلاعات والدین نمایش داده شود', async ({ page }) => {
    await goToRegister(page);

    // Parent section should not be visible yet
    await expect(page.getByText('اطلاعات والدین / سرپرست')).not.toBeVisible();

    await page.selectOption('select[name="ageGroup"]', '8-12');

    await expect(page.getByText('اطلاعات والدین / سرپرست')).toBeVisible();
    await expect(page.locator('input[name="parentName"]')).toBeVisible();
    await expect(page.locator('input[name="parentEmail"]')).toBeVisible();
  });

  // ── 8. Adult does NOT show parent section ─────────────────────────────────
  test('باید برای بزرگسالان، بخش اطلاعات والدین نمایش داده نشود', async ({ page }) => {
    await goToRegister(page);

    await page.selectOption('select[name="ageGroup"]', '18-25');

    await expect(page.getByText('اطلاعات والدین / سرپرست')).not.toBeVisible();
    await expect(page.locator('input[name="parentName"]')).not.toBeVisible();
  });

  // ── 9. Terms checkbox required ────────────────────────────────────────────
  test('باید قبول نکردن شرایط را رد کند', async ({ page }) => {
    await goToRegister(page);

    // Fill everything valid EXCEPT the checkbox
    await page.fill('input[name="firstName"]', 'علی');
    await page.fill('input[name="lastName"]', 'رضایی');
    await page.fill('input[name="email"]', 'ali@test.com');
    await page.fill('input[name="phone"]', '09123456789');
    await page.fill('input[name="dateOfBirth"]', '1995-06-15');
    await page.selectOption('select[name="ageGroup"]', '18-25');
    await page.selectOption('select[name="program"]', 'adult-recreational');
    await page.selectOption('select[name="experience"]', 'beginner');
    await page.fill('input[name="emergencyContactName"]', 'محمد');
    await page.fill('input[name="emergencyContact"]', '09111111111');
    // Do NOT check terms

    await page.click('button[type="submit"]');

    const termsError = page.locator('p.text-red-600').filter({ hasText: /terms|شرایط/i });
    await expect(termsError).toBeVisible();
  });

  // ── 10. URL query pre-fills program ───────────────────────────────────────
  test('باید برنامه از URL query pre-fill شود', async ({ page }) => {
    await page.goto('/register?program=adult-recreational');
    await page.waitForLoadState('networkidle');

    // Select the matching age group so the program select appears
    await page.selectOption('select[name="ageGroup"]', '18-25');

    const programSelect = page.locator('select[name="program"]');
    await expect(programSelect).toBeVisible();
    await expect(programSelect).toHaveValue('adult-recreational');
  });

  // ── 11. Form submit calls API (mocked) ────────────────────────────────────
  test('باید فرم معتبر را به API ارسال کند', async ({ page }) => {
    // Intercept the /api/register call and return a mock success
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'ثبت نام با موفقیت انجام شد',
          sessionId: 'test_session_123',
        }),
      });
    });

    await goToRegister(page);
    await fillValidAdultForm(page);

    // Capture the network request
    const [request] = await Promise.all([
      page.waitForRequest('**/api/register'),
      page.click('button[type="submit"]'),
    ]);

    expect(request.method()).toBe('POST');
    const body = request.postDataJSON();
    expect(body.firstName).toBe('علی');
    expect(body.email).toBe('ali.rezaei@test.com');
    expect(body.ageGroup).toBe('18-25');
    expect(body.terms).toBe(true);
  });

  // ── 12. Successful submission shows toast ─────────────────────────────────
  test('باید بعد از ثبت نام موفق، پیام موفقیت نمایش دهد', async ({ page }) => {
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ثبت نام با موفقیت انجام شد', sessionId: 'ses_abc' }),
      });
    });

    // Intercept the redirect so the test doesn't navigate away
    await page.route('**/payment**', (route) => route.abort());

    await goToRegister(page);
    await fillValidAdultForm(page);
    await page.click('button[type="submit"]');

    // The react-hot-toast success message should appear
    const toast = page.locator('[role="status"], .go2072408551, [class*="toast"]').first();
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  // ── 13. API error shows toast ─────────────────────────────────────────────
  test('باید خطای API را به صورت toast نمایش دهد', async ({ page }) => {
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'کاربری با این ایمیل قبلاً ثبت شده است' }),
      });
    });

    await goToRegister(page);
    await fillValidAdultForm(page);
    await page.click('button[type="submit"]');

    // Error toast should appear
    const toast = page.locator('[role="status"], .go2072408551, [class*="toast"]').first();
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  // ── 14. Youth form includes parent data in request ────────────────────────
  test('باید اطلاعات والدین را در درخواست کودکان ارسال کند', async ({ page }) => {
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ok', sessionId: 'ses_youth' }),
      });
    });

    await page.route('**/payment**', (route) => route.abort());

    await goToRegister(page);
    await fillValidYouthForm(page);

    const [request] = await Promise.all([
      page.waitForRequest('**/api/register'),
      page.click('button[type="submit"]'),
    ]);

    const body = request.postDataJSON();
    expect(body.ageGroup).toBe('8-12');
    expect(body.parentName).toBe('حسن احمدی');
    expect(body.parentEmail).toBe('hasan.ahmadi@test.com');
  });

  // ── 15. Submit button disabled during submission ──────────────────────────
  test('باید دکمه ثبت نام در حین پردازش غیرفعال باشد', async ({ page }) => {
    // Delay the API response to observe the disabled state
    await page.route('**/api/register', async (route) => {
      await new Promise((r) => setTimeout(r, 800));
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ok', sessionId: 'ses_slow' }),
      });
    });

    await page.route('**/payment**', (route) => route.abort());

    await goToRegister(page);
    await fillValidAdultForm(page);

    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // While the (delayed) API is in flight the button should be disabled
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toHaveText('در حال پردازش...');
  });

  // ── 16. All form sections present ─────────────────────────────────────────
  test('باید تمام بخش‌های فرم نمایش داده شوند', async ({ page }) => {
    await goToRegister(page);

    await expect(page.getByText('اطلاعات شخصی')).toBeVisible();
    await expect(page.getByText('تماس اضطراری')).toBeVisible();
    await expect(page.getByText('اطلاعات پزشکی')).toBeVisible();
    await expect(page.getByText(/شرایط و قوانین/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'تکمیل ثبت نام و پرداخت' })).toBeVisible();
  });
});
