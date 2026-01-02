import { test, expect } from '@playwright/test'

test('search feature in Admin page',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    //page.getByAltText() - to locate an element, usually image, by its text alternative.
    
    await expect(await page.getByAltText("company-branding")).toBeVisible()

    //login to orange system.
    
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole("button",{type:"submit"}).click()
    //locate the list of the side menu elements
await page.waitForSelector("//ul[@class='oxd-main-menu']//li")
    const listItems=await page.$$("//ul[@class='oxd-main-menu']//li//a//span")
    //loop the side menu text elements and click "Admin" element/page
    for (const listItem of listItems){
        const itemText=await listItem.textContent()


             if(await itemText.includes("Admin")){

            await listItem.click();
            break;  // Exit loop after clicking to prevent stale element errors

        }}

    
   //locate search label and insert the search key
await page.locator('div[class="oxd-form-row"] input[class="oxd-input oxd-input--active"]').fill("test_LV")

await page.locator("(//div[contains(text(),'-- Select --')])[1]").click();
await page.waitForSelector('//div[@class="oxd-select-wrapper"]//div[@class="oxd-select-option"]')
const roleList=await page.$$('//div[@class="oxd-select-wrapper"]//div[@class="oxd-select-option"]//span')

for(const roleOpt of roleList){
    const roleTxt=await roleOpt.textContent()
    if(await roleTxt.includes("Admin")){
        await roleOpt.click();
        break;
    }
}
await page.waitForTimeout(1000)
await page.getByPlaceholder("Type for hints...").fill("Or")
await page.waitForTimeout(2000)
await page.waitForSelector("div[role='option']")

const empList=await page.$$('//div[@role="option"]//span')
for(const empOpt of empList){
    const empTxt=await empOpt.textContent()
    //console.log('empTxt: ' + empTxt)
    if (empTxt.includes("Orange  Test")) {
        //console.log('condition met, clicking')
        await empOpt.click()
        break;
    }
}


await page.waitForTimeout(1000)
await page.locator("(//div[contains(text(),'-- Select --')])[1]").click();
await page.waitForTimeout(2000)
const statusList=await page.$$("div[role='option'] span")
for(const status of statusList ){
    const statusTxt=await status.textContent()
    if(statusTxt.includes("Enabled")){
        await status.click();
        break;
    }
}

await page.locator('button[type="submit"]').click()
await page.waitForTimeout(3000)
//await page.waitForSelector('//div[@class="oxd-table-card"]//div[@role="cell"][2]')
const results=await page.locator('//div[@class="oxd-table-card"]//div[@role="cell"][2]//div').textContent()
const numberOfResults=await page.locator('//div[@class="oxd-table-card"]//div[@role="cell"][2]//div').count()
console.log(numberOfResults)

let correctResults=false;
if (results=="test_LV") {
    correctResults=true;
}

console.log("search result is" +" " +correctResults)
await expect(results).toBe("test_LV")
})
