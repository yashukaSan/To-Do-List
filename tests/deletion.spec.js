import { test, expect } from '@playwright/test';

test.describe('tests to check deletion', ()=>{
    test.beforeEach(async ({ page })=>{
        await page.goto('http://localhost:5173/');

        //add item 1
        for(let i=0; i<4; i++){
            await page.locator("#add-task-button").click();
            await page.locator("#input-title").fill(`Task ${i+1}`);
            await page.locator("#add-button").click();
        }

    })

    //removing an item
    test('delete item one', async({ page }) => {      
        await page.locator('#remove-1').click();
        await expect(page.getByText("Task 1")).not.toBeVisible();
    })

    //removing an item and check the number of task left
    test('should decreease items count', async ({ page }) => {
        await expect(page.locator('[id^="task-"]')).toHaveCount(4);

        await page.locator('#remove-1').click();

        await expect(page.locator('[id^="task-"]')).toHaveCount(3);
    })

    //removing two items
    test('deleting 2 items', async({ page }) => {
        await page.locator('#remove-4').click();
        await page.locator('#remove-3').click();

        await expect(page.getByText("Task 1")).toBeVisible();
        await expect(page.getByText("Task 2")).toBeVisible();
        await expect(page.getByText("Task 3")).not.toBeVisible();
        await expect(page.getByText("Task 4")).not.toBeVisible();
    });

    //clearing all items
    test('clearing all tesks', async({ page }) => {
        await page.locator('#remove-all').click();

        await expect(page.locator('[id^="task-"]')).toHaveCount(0);
    });

    //clearing all items with empty teak list
    test('clearing empty task list', async({ page }) => {
        await expect(page.locator('[id^="task-"]')).toHaveCount(4);

        await page.locator('#remove-all').click();

        await expect(page.locator('[id^="task-"]')).toHaveCount(0);
    })
})