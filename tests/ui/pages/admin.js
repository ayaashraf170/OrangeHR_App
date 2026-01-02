import { routes } from "../../test-data/routes.js"
import { expect } from "@playwright/test"

class AdminPage {
   constructor(page) {

      this.page = page;
      this.addBtn = page.getByRole('button', { name: ' Add ' });
      this.userRoleInput = page.getByLabel('User Role');
      //this.userRoleInput=this.page.getByRole('label',{name:'User Role'}).locator('input')
      this.userRoleList = this.userRoleInput.getByRole('listbox');
      this.roleOpts = this.userRoleList.getByRole('option');
      this.employeeName = page.getByPlaceholder('Type for hints...');
      this.employeeOpt = this.employeeName.getByRole('listbox').getByRole('option')
      this.status = page.getByLabel('Status');
      this.statusList = this.status.getByRole('listbox')
      this.statusOpts = this.statusList.getByRole('option');
      this.userName = page.getByLabel('Username');
      this.passwordField=page.getByLabel('Password').locator("input[type='Password']")

      this.confirmPasswordField=page.getByLabel('Confirm Password').locator("input[type='Password']")


   }

   async RandomEmployee(employeeSearchText) {

      //locate input field and insert text
      await this.employeeName.fill(employeeSearchText);
      //verify that there is at least one option
      await expect(this.employeeOpt.first()).toBeVisible();
      //get the count the of the options
      const numberOfOpt = this.employeeOpt.count();
      //select a random option from the list
      await this.employeeOpt.nth(Math.floor(Math.random() * numberOfOpt)).click();



   }

   async createAdmin(name, employeeSearchText,password) {

    let userNameText;

      this.addBtn.click();

      await expect(this.page).toHaveURL(routes.addAdmin);
      await this.userRoleInput.click();
      await this.userRoleList.getByRole('option', { name }).click();
      await this.RandomEmployee(employeeSearchText);

      for(const statusOpt of this.statusOpts){
        const statusOptText=statusOpt.textContent();
        if( statusOptText.includes('Enabled')){
         await statusOpt.click();
        }

      };

      userNameText=this.employeeName.textContent();
      await this.userName.fill(userNameText)
      await this.passwordField.fill(password)
      await this.confirmPasswordField.fill(password)

   }






}

export { AdminPage }