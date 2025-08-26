import { BeforeAll, AfterAll, Before, After, AfterStep, Status } from "@cucumber/cucumber";
import {chromium, Browser, Page, BrowserContext  } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import NavigateToApplication from "../pages/Login.page";
import {getEnv} from "../helper/env/env"
import { invokeBrowser } from "../helper/browsers/browserManager";

let page: Page;
let browser:  Browser;
let context: BrowserContext;
let navigate: NavigateToApplication;



BeforeAll (async function () {
    console.log('BeforeAll hook started');
    getEnv();
    browser = await invokeBrowser();
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;

    navigate = new NavigateToApplication(page);
    await navigate.NavigateToApplication();

    console.log('BeforeAll hook is finsihed')
    

    
})
Before(async function (){
    
})

AfterStep (async function ({pickle}){

   const img = await pageFixture.page.screenshot({path: `./test-result/screenshots/${pickle.name}.png`, type: "png"});
   await this.attach(img, "image/png");
})

After (async function({pickle, result}){
    
    console.log(result?.status)
    if(result?.status == Status.FAILED){
       const img = await pageFixture.page.screenshot({path: `./test-result/screenshots/${pickle.name}.png`, type: "png"});
        await this.attach(img, "image/png")
    }

})

AfterAll (async function (){
    await pageFixture.page.close();
    await context.close();
    await browser.close(); 
})