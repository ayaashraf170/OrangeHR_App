import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { routes } from "../../../test-data/routes.js";

test('login using valid user name and valid password', async ({ page }) => {

    //instantiate LoginPage using POM
    const loginPage = new LoginPage(page);
    
    //Navigate to the login page via LoginPage abstraction
    await loginPage.open();

    //Login to the application with valid Admin credentials

    await loginPage.login('Admin', 'admin123');
    //ensure the user is edirected to the dashboard by verifying the currecnt page url
    await expect(page).toHaveURL(routes.dashboard);
    
})
 






test.describe('invalid cases of login functionality ', () => {
    //Declare loginPage variables to intialize fresh instance before each test
    let loginPage;



    //initialize LoginPage object using POM before each test 
    test.beforeEach(async ({ page }) => {
        //instantiate LoginPage object using POM
        loginPage = new LoginPage(page);

        //Navigate the login page via abstraction
        await loginPage.open();


    })


    test('login using valid username and invalid password', async () => {

        //Attemp login to the App using invalid password
        await loginPage.login('Admin', 'admin467');
        //ensure the user is redirected again to login page and the login failed
        await expect(loginPage.page).toHaveURL(loginPage.url);
        //ensure the validation message "invalid credentails" shows up 
        await expect(loginPage.invalidCredMsg).toBeVisible({ timeout: 5000 });


    })


    test('login using invalid username and invalid password', async () => {

        //Attemp login to the App using invalid password and username
        await loginPage.login('Admitrn67', 'admin467')
        //ensure the user is redirected again to login page and the logins fails
        await expect(loginPage.page).toHaveURL(loginPage.url)
        //ensue that the ivalidation message "invalid credentails" shows up
        await expect(loginPage.invalidCredMsg).toBeVisible({ timeout: 5000 });

    })


    test('login without inserting a password', async () => {
        //Atemp login to the app with username only
        await loginPage.login('Admin', '');
        //ensure the user is redirected to the login page and login fails
        await expect(loginPage.page).toHaveURL(loginPage.url);
        //ensure the validation message"Required" shows up
        await expect(loginPage.requiredMsg).toBeVisible({ timeout: 5000 });
        //verify only one validation messages appears 
        await expect(loginPage.requiredMsg).toHaveCount(1);

    })



    test('login without inserting credential details', async () => {
        //Attemp login to the app without username and password
        await loginPage.login('', '');
        //ensure the user is redirected to the login page and login fails
        await expect(loginPage.page).toHaveURL(loginPage.url);
        //verify that the validation message appears for both fields
        await expect(loginPage.requiredMsg).toHaveCount(2);

    })

})