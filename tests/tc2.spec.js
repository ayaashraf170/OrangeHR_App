import {test , expect} from "@playwright/test"

test("successfully Add a new user with full data",async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //assert the login page
    await expect(await page.getByAltText("company-branding")).toBeVisible()
    //insert the login credential
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
     //click the login button
    await page.getByRole("button",{type:'submit'}).click()
     //assert that successfull login and redirection to the Dashboard
    await expect(await page.getByAltText("profile picture")).toBeVisible()
    await expect(await page.locator("p[class='oxd-userdropdown-name']").textContent()).toBe("Emily Jones")
    //locate the list of the side menu elements
    const listItems=await page.$$("//ul[@class='oxd-main-menu']//li//a//span")
    //loop the side menu text elements and click "Admin" element/page
for (const listItem of listItems){
        const itemText=await listItem.textContent()


             if(itemText.includes("Admin")){

            await listItem.click();
            break;  // Exit loop after clicking to prevent stale element errors

        }}
        //assert that the system redirects successfully to the clicked page
        await expect(await page.locator("//span[@class='oxd-topbar-header-breadcrumb']//h6[2]").textContent()).toBe("User Management")
        //click "Add" button to Add a new user 

        await page.locator('//button[@type="button"][normalize-space()="Add"]').click();

        //assert that the system redirects successfully to the Add user form /page
        await expect(await page.url("https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser")).toBeTruthy
        
       await expect(await page.locator("span[class='oxd-topbar-header-breadcrumb'] h6").textContent()).toBe("Admin")

    //filling the form
       await page.locator('(//div[@class="oxd-select-text oxd-select-text--active"])[1]').click()
       await page.locator('//div[@role="listbox"]//span[normalize-space()="Admin"]').click()
       await page.locator('(//div[@class="oxd-select-text oxd-select-text--active"])[2]').click()
       await page.locator('//div[@role="listbox"]//span[normalize-space()="Enabled"]').click()
       await page.getByPlaceholder("Type for hints...").fill("test")
       await page.waitForSelector("div[role='listbox'] div[role='option'] span")
       const emOps=await page.$$("div[role='listbox'] div[role='option'] span")
       for(const emOp of emOps){
        const opText=await emOp.textContent()
        if(await opText.includes("test test test")){
            await emOp.click()
            break;
        }
       }

       await page.locator("//div[normalize-space()='Username']//input[@class='oxd-input oxd-input--active']").fill('testUser103')
       await page.locator("(//input[@type='password'])[1]").fill("Aa@12345")
       await page.locator("(//input[@type='password'])[2]").fill("Aa@12345")

       //submit the form
       await page.getByRole('button',{name:" Save "}).click();
//wait for the table data
    await page.waitForSelector('div[class="oxd-table-card"] div[role="row"]')
    //get and print the number of the created users in the 1st page
       const tbRows=await page.locator('div[class="oxd-table-card"] div[role="row"]').count()
       console.log("number of created users is"+ " "+tbRows)
       //store the data of the rows  in an array to assert the new created user
       const rowsTexts=await page.$$eval('div[class="oxd-table-card"] div[role="cell"]',rows=>rows.map (row=>row.textContent.trim('\n')))
       await expect(rowsTexts.includes("testUser103")).toBeTruthy();



       


})

