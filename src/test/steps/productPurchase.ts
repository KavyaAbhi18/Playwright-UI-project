import {Given, When,Then} from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/Login.page";
import ProductPage from "../../pages/productpage.page";
import CommonPage from "../../pages/common.page";
import * as productData from '../../helper/util/test-data/product.json';


let loginPage: LoginPage;
let productPage : ProductPage;
let commonPage: CommonPage;

       
    Given('User is on {string} page', async function (welcomePage:string) {
                loginPage = new LoginPage(pageFixture.page);
                await loginPage.validatePageNavigation(welcomePage);
          
        });;

        Given('User go to {string} page', async function (menu:string) {
                commonPage = new CommonPage(pageFixture.page);
                await commonPage.clickMenu(menu);
         
         });

        Given('User click {string} tab', async function (tab:string) {
                commonPage = new CommonPage(pageFixture.page);
                await commonPage.clickSubTab(tab);
         });
       
    
       
         Given('User selects an puchasing item from the dropdown', async function () {
             productPage = new ProductPage(pageFixture.page);
             await productPage.selectProduct();
         
         });

       
  
         Given('User clicks on purchase button', async function () {
             await productPage.clickPurchase();
         
         });
       
         Given('User provides the Quantity', async function () {
              await productPage.provideQuantity();
         });

         Given('User clicks on {string} button', async function (submit:string) {
              await productPage.clickSubmit(submit);
         });

         Given('User selects the previously ordered item', async function(){
              productPage = new ProductPage(pageFixture.page);
              await productPage.clickOnNewlyPurchasedProduct(); 
         });
         Given('User selects {string} from dropdown', async function(product: string){
                 productPage = new ProductPage(pageFixture.page);
                 await productPage.makePurchase(product);
                      
         })

         Given('User provides the Quantity as {string}', async function(quantity: string){
                 productPage = new ProductPage(pageFixture.page);
                 await productPage.provideQuantities(quantity);
                      
         })
         Then('User should see that the {string} with quantity {string} is displayed as purchased', async function(product: string, quantity: string){
                 productPage = new ProductPage(pageFixture.page);
                 await productPage.varifyPurchasedItemInInventoryPage(product,quantity);
                      
         })
         

         When('User should see the newly purchased item displayed as purchased', async function () {
             productPage = new ProductPage(pageFixture.page);
             await productPage.validatePurchasedItemInInventoryPage();
         
         });
        When('User removes the quantity', async function(){
             await productPage.removeQuantity();

        })     
       
       
        Then('User verifies that the items have not been purchased are marked as {string}', async function (notPurchased: string) {
             await productPage.validateNotPurchasedProduct(notPurchased);
        });

        Then('User should see the updated quantity in the inventory page', async function (){
            await productPage.verifyAfterRemovesTheProductQuantity();
        })



       
        

