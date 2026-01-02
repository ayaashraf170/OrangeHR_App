import { test , expect } from "@playwright/test";

test("login successfully",async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //locate an element by properies
    await expect(await page.getByAltText("company-branding")).toBeVisible()
    await page.getByPlaceholder("Username").fill("Ayaaa")
    await page.getByPlaceholder("Password").fill("Aa01150")
     //await page.getByRole("button,{name:'Add Item'}").click()
    await page.getByRole("button",{type:'submit'}).click()
     
    await expect(await page.getByAltText("profile picture")).toBeVisible()
    await expect(await page.locator("p[class='oxd-userdropdown-name']").textContent()).toBe("Emily Jones")

   
})