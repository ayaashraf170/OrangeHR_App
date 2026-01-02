import { test ,expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { DashboardPage } from "../../pages/dashboard.js";
import { AdminPage } from "../../pages/admin.js";
import { userCred } from "../../../test-data/users.js";
import { routes } from "../../../test-data/routes.js";

test.describe('create a new admin ',async()=>{
let loginPage;
let dashboardPage;
let adminPage;

test.beforeEach('',async({page})=>{

    loginPage= new LoginPage(page);
    dashboardPage= new DashboardPage(page);
    adminPage= new AdminPage(page);
    await loginPage.open();
    await loginPage.login(userCred.Admin.username,userCred.Admin.password)
    await dashboardPage.clickMenuModule("Admin")

})

test('',async()=>{

    


    

})



})
