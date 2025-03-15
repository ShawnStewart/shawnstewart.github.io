import { WelcomePage } from '@e2e/page-object-models/pages/WelcomePage';
import { expect, test as baseTest } from '@e2e/test-override';

const test = baseTest.extend<{ welcomePage: WelcomePage }>({
  welcomePage: async ({ page }, runTest) => {
    const welcomePage = new WelcomePage({ page });
    await welcomePage.open();
    await runTest(welcomePage);
  },
});

test('renders heading', async ({ welcomePage }) => {
  await expect(welcomePage.heading).toBeVisible();
});

test('renders tech cards', async ({ welcomePage }) => {
  await Promise.all(welcomePage.technologyCards.map((techCard) => expect(techCard).toBeVisible()));
});
