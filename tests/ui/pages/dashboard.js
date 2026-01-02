
class DashboardPage{
    constructor(page){

        this.page=page;
       
        this.menu=page.getByRole('Navigation',{name:"Sidepanel"}).getByRole("list")

        this.menuModule=this.menu.getByRole("link").locator("//span")

        
    }

    /*getMenuModule (name){

        return this.menu.getByRole('link',{name})

    };*/

    async clickMenuModule(name){

     //await this.getMenuModule(name).click();
     this.menu.getByRole('link',{name}).click();

     
    };

}


export {DashboardPage};

