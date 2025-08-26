
import {expect, Page} from "@playwright/test";


export default class CommonPage {

     constructor(private  page: Page){
        this.page = page;

    }


async clickMenu (menu :string){
       const Menu = await this.page.getByRole('link', {name:menu, exact:true});
       await Menu.click();

    }

    async clickSubTab (menu :string){
       const Menu = await this.page.getByRole('button', {name:menu, exact:true});
       await Menu.click();

    }
}