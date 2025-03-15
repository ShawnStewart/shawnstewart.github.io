import { expect, test } from '@e2e/test-override';

test('using hotkey "Alt+T" switches theme', async ({ basePage }) => {
  await basePage.theme.expectThemeToBeLight();
  await basePage.page.keyboard.press('Alt+T');
  await basePage.theme.expectThemeToBeDark();
});

test('using hotkey "Alt+S" opens sidebar', async ({ basePage }) => {
  await basePage.page.keyboard.press('Alt+S');
  await expect(basePage.pageHeader.navigationMenu).toBeVisible();
});

test('using hotkey "Alt+K" opens hotkeys dialog', async ({ basePage }) => {
  await basePage.page.keyboard.press('Alt+K');
  await expect(basePage.pageHeader.hotkeysDialog).toBeVisible();
});
