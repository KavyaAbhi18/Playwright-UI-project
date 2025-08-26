import {expect, Page} from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";

export default class LoginPage {

    constructor(private  page: Page){
        this.page = page;

    }



    async NavigateToApplication(){
        const baseURl = process.env.BASEURL;
        if(baseURl){
            await pageFixture.page.goto(baseURl);
        } else {
            throw new Error ('BaseURL env variable is not defined');
        }
       

    }

    async validatePageNavigation(welcomePage: string){
          const homePage = await this.page.getByRole('heading', {name:welcomePage, exact: true});
          const welcomeText = await homePage.textContent();
          console.log("The home page has :", welcomeText)
          expect(welcomeText).toBe(welcomePage);
          
    }
}