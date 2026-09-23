import { test, expect } from "@playwright/test";

test.beforeEach(async ({page})=>{
    await page.goto("http://localhost:5173/");
})
test.describe("adding items", ()=>{
    //checks if the items 1 is added or not
    test("Adding Item 1", async ({page})=>{
        await page.locator('#add-task-button').click();
        await page.locator('#input-title').fill('Task 1');
        await page.locator('#add-button').click();

        await expect(page.getByText('Task 1')).toBeVisible();
    });
    //check if the item 2 is added or not

    test('Adding Task 2', async({ page }) => {
        await page.locator('#add-task-button').click();
        await page.locator('#input-title').fill('Task 2');
        await page.locator('#add-button').click();

        await expect(page.getByText('Task 2')).toBeVisible();
    });
    //chceks whiat if try to add an item without Title

    test("Adding Empty Task", async({ page }) => {

        let isAlertPop = false;
        let alertMessage='';

        page.once('dialog', async (dialog) => {
            isAlertPop = true;
            alertMessage = dialog.message();

            await dialog.accept();
        });

        await page.locator('#add-task-button').click();
        await page.locator('#input-title').fill('');
        await page.locator('#add-button').click();

        expect(isAlertPop).toBe(true);
        expect(alertMessage).toBe('Title Cannot be Empty');
    });

})