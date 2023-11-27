import { test, expect } from '@playwright/test';

const newPlace = {
  name: "TEST_LOCATION",
  fieldType: "Зал",
  gameType: "8 x 8",
  metro: "ВДНХ",
  infrastructure: "Песок",
  teamsAmount: "8",
  ticketsAmount: "100",
  description: "Это тестовая площадка, но погода здесь всегда солнечная!",
  mapPosition: {
    x: 20,
    y:20
  }
}

test('New place creation', async ({ page }) => {
  await page.goto('https://f.crossball.ru/places');
  await page.getByRole('button', { name: 'Добавить' }).click();
  
  await page.locator('input').first().fill(newPlace.name);
  await page.getByRole('button', { name: 'Открыть карту' }).click();
  await page.locator('.ymaps-2-1-79-events-pane').click({ position: {x: newPlace.mapPosition.x, y: newPlace.mapPosition.y} });
  await page.locator('div:nth-child(5) > div > .input > .input__box > input').first().click();
  await page.getByText(newPlace.fieldType).click();
  await page.locator('div:nth-child(5) > div:nth-child(2) > .input > .input__box > input').click();
  await page.getByText(newPlace.gameType).click();
  await page.locator('div:nth-child(6) > div > .input > .input__box > input').click();
  await page.getByText(newPlace.metro).click();
  await page.locator('._input').click();
  await page.getByText(newPlace.infrastructure).click();
  await page.getByLabel('Количество команд').fill(newPlace.teamsAmount);
  await page.locator('div').filter({ hasText: /^Количество билетов$/ }).getByRole('textbox').nth(1).fill(newPlace.ticketsAmount);
  await page.locator('textarea').nth(2).fill(newPlace.description);
  await page.getByRole('button', { name: 'Добавить' }).click();

  // Assertion 
  await expect(page.getByText('Площадка успешно добавлена')).toBeVisible();
});