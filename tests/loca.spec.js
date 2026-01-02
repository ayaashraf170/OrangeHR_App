import { test , expect } from "@playwright/test";
test("locators",async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //locate an element by properies
    await expect(await page.getByAltText("company-branding")).toBeVisible()
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
     //await page.getByRole("button,{name:'Add Item'}").click()
    await page.getByRole("button",{type:'submit'}).click()
     
    await expect(await page.getByAltText("profile picture")).toBeVisible()
    await expect(await page.locator("p[class='oxd-userdropdown-name']").textContent()).toBe("Ahmed Elian")

    await page.waitForSelector("//ul[@class='oxd-main-menu']//li")

    await page.locator("//ul[@class='oxd-main-menu']//li[1]").click()

    await expect(await page.locator("//span[@class='oxd-topbar-header-breadcrumb']//h6[1]").textContent()).toBe("Admin")
    await expect(await page.locator("//span[@class='oxd-topbar-header-breadcrumb']//h6[2]").textContent()).toBe("User Management")
    
   
    await page.waitForTimeout(5000)
    
})

/*
a way to assert that the position of the errorbox is under the inputRect
.y : y is a property of the returned object from playwright after we send .boundingBox() method

we should assert the visibility of the element before using this method because if it doesn#t exist then it will return null
the returned object is {y:value , x:value , height:value , width:value}
const errorBox = page.getByText('Required', { exact: true });
const usernameInput = page.locator('input[name="username"]');

const errorBoxRect = await errorBox.boundingBox();
const inputRect = await usernameInput.boundingBox();

expect(errorBoxRect.y).toBeGreaterThan(inputRect.y);
*/