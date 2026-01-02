import { test ,expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { DashboardPage } from "../../pages/dashboard.js";
import { routes } from "../../../test-data/routes.js";
import { allowedList } from "../../../test-data/sidemenu.js";
import { userCred } from "../../../test-data/users.js";
import {AdminPage} from "../../pages/admin.js"
import { LOADIPHLPAPI } from "dns";
import { getRandomValues } from "crypto";

test.describe('verify the permitted side menu modules based on user roles',()=>{

    let loginPage;
    let dashboardPage;
    let adminPage

    test.beforeEach('',async({page})=>{

    loginPage=new LoginPage(page)
    dashboardPage=new DashboardPage(page)
    await loginPage.open();
    
    
    })

    test('verify the permitted side menu modules for Admin user',async()=>{

        await loginPage.login(userCred.Admin.username,userCred.Admin.password)

      //await expect(dashboardPage.menu.getByRole("link")).toHaveText(["Admin","PIM","Leave","Time","Recruitment","My Info","Performance","Dashboard","Directory","Maintenance","Claim","Buzz",])
      await expect (dashboardPage.menuModule).toHaveText(allowedList.Admin)

})

test('verify the permitted side menu modules for employee user',async()=>{

    await loginPage.login(userCred.employee.username,userCred.employee.password)

    await expect(dashboardPage.menuModule).toHaveText(allowedList.employee)


})





})





test.describe('verify the list of links redirects to the correct pages',()=>{

    let loginPage;
    let dashboardPage;
    let adminPage;

test.beforeEach('',async({page})=>{

loginPage=new LoginPage(page)
dashboardPage=new DashboardPage(page)
await loginPage.open();
await loginPage.login(userCred.Admin.username,userCred.Admin.password)


});


test('Admin Link redirects to the Admin page',async()=>{

await dashboardPage.clickMenuModule('Admin');
await expect(dashboardPage.page).toHaveURL(routes.admin)

});


test('PIM Link redirects to the PIM page',async()=>{

await dashboardPage.clickMenuModule('PIM');
await expect(dashboardPage.page).toHaveURL(routes.pim)

});

test('Admin user can access the maintenance page by inserting wrong password',async()=>{
    await dashboardPage.clickMenuModule('Maintenance')
    await expect(dashboardPage.page).toHaveURL(routes.maintenance)
    await dashboardPage.page.locator("input[name='password']").fill(userCred.Admin.password)
    await dashboardPage.page.getByRole('button',{name:' Confirm '}).click();
    await expect(dashboardPage.page.getByRole('heading',{name:'Maintenance'})).toBeVisible()

})

test("Admin user can't access the maintenance page with wrong password",async()=>{

    await dashboardPage.clickMenuModule('Maintenance')
    await expect(dashboardPage.page).toHaveURL(routes.maintenance)
    await dashboardPage.page.locator("input[name='password']").fill('vvfs546')
    await dashboardPage.page.getByRole('button',{name:' Confirm '}).click();
    await expect(dashboardPage.page.getByText('Invalid credentials',{ exact :true})).toBeVisible();
})



})