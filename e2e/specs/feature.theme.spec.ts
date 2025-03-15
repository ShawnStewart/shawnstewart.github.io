import { test } from '@e2e/test-override';

test('default theme is light', async ({ basePage }) => {
  await basePage.theme.expectThemeToBeLight();
});

test('clicking on the theme toggle changes the theme', async ({ basePage }) => {
  await basePage.theme.expectThemeToBeLight();
  await basePage.pageHeader.themeToggleButton.click();
  await basePage.theme.expectThemeToBeDark();
});
