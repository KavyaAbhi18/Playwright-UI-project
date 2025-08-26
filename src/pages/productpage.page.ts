import {expect, Page} from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import * as productData from '../helper/util/test-data/product.json';
export default class ProductPage {

     constructor(private  page: Page){
        this.page = page;

    }

    private elements = {
        productDropdown: "//*[@id='catalogue-dropdown']",
        purchaseButton: "(//*[contains(text(), 'Purchase')])[2]",
        quantityField: "//*[@class='inputField']",
        removeQuantity: "//*[@class='inputField']",
       

    }
    

   

    async selectProduct (){
    
       const drpdwn = await this.page.locator(this.elements.productDropdown);
       await drpdwn.click();
       const options = await drpdwn.locator('option').all();
       for (const option of options){
        const label = await option.textContent();
        if (label && label.includes(productData.product)){
            const value = await option.getAttribute('value');
            if(value){
                await drpdwn.selectOption({value});
                return;
            }

        }
       }
       throw new Error (`Option containing text "${productData.product}" not found in the dropdown`)
      
    }

    async makePurchase (product: string){
    
       const drpdwn = await this.page.locator(this.elements.productDropdown);
       await drpdwn.click();
       const options = await drpdwn.locator('option').all();
       for (const option of options){
        const label = await option.textContent();
        if (label && label.includes(product)){
            const value = await option.getAttribute('value');
            if(value){
                await drpdwn.selectOption({value});
                return;
            }

        }
       }
       throw new Error (`Option containing text "${productData.product}" not found in the dropdown`)
      
    }

    async provideQuantities(quantity: string){
       const quantityText = await this.page.locator(this.elements.quantityField);
       await quantityText.fill(quantity);
    }
       
      
    

    async clickPurchase (){
        const purchaseBtn = await this.page.locator(this.elements.purchaseButton);
        await purchaseBtn.click();
    }

    async provideQuantity(){
       const quantityText = await this.page.locator(this.elements.quantityField);
       await quantityText.fill(productData.quantity);
    }

    async clickSubmit(submit: string){
        const submitbtn = await this.page.getByRole('button', {name:submit, exact: true});
        await submitbtn.click();

    }

    async validatePurchasedItemInInventoryPage(){
            const regex = new RegExp(`${productData.quantity} ${productData.product} purchased for`);
            console.log("The puchased item quantity and the name is: ", regex);
            const purchasedItem = await this.page.locator('.catalogue-item', {hasText: regex });
            await expect (purchasedItem).toBeVisible();
            await expect(purchasedItem.getByText('purchased for')).toBeVisible();
    }

    async varifyPurchasedItemInInventoryPage(product:string, quantity: string){
            const regex = new RegExp(`${quantity} ${product} purchased for`);
            console.log("The puchased item quantity and the name is: ", regex);
            const purchasedItem = await this.page.locator('.catalogue-item', {hasText: regex });
            await expect (purchasedItem).toBeVisible();
            await expect(purchasedItem.getByText('purchased for')).toBeVisible();
    }

    

    async clickOnNewlyPurchasedProduct(){
        const regex = new RegExp(`${productData.quantity} ${productData.product} purchased for`);
        console.log("The puchased item quantity and the name is: ", regex);
        const purchasedItem = await this.page.locator('.catalogue-item', {hasText: regex });
        await purchasedItem.click();
    }

    async validateNotPurchasedProduct(notpuchased: string){
        const allItems = await this.page.locator('.catalogue-item');
        const count = await allItems.count();
        console.log("The total number of items found is: ",count)
        console.log('---Verifying Inventory Items---');
        for (let i = 0; i < count; ++i) {
           const item = allItems.nth(i);
           const itemText = await item.textContent();
           if (itemText && !itemText.includes(productData.product)) {
              await expect(item.getByText('not purchased')).toBeVisible();
        } else {
            throw new Error("No puchased items are detected");
        }

        /*   I am trying the get the name of the not purchased products but getting some error  
            if(itemText){
                if(!itemText.includes(purchasedProduct)){
                    await expect(item.getByText('not purchased')).toBeVisible();
                    const itemName = itemText.split('not purchased')[0].trim();
                    notPurchasedItems.push(itemName);
                } else {
                    await expect(item.getByAltText('purchased for')).toBeVisible();
                }
            }
           console.log('\nThe following items were successfully verified as NOT purchased:');
           notPurchasedItems.forEach(name => console.log(`- ${name}`));
           console.log('-------------------------------');*/
       }
    }

    async removeQuantity(){
        const removeQuantity = await this.page.locator(this.elements.removeQuantity);
        await removeQuantity.clear();
        await removeQuantity.fill(productData.reduceQuantity);
        const removetbtn = await this.page.getByRole('button', {name: 'Remove' , exact: true});
        await removetbtn.click(); 
    }

    async verifyAfterRemovesTheProductQuantity (){
            const originalQuantity = Number(productData.quantity);
            const quantityToReduce = Number(productData.reduceQuantity);
            const reducedQuantity = originalQuantity - quantityToReduce;
            console.log("The reduce quantity is : ", reducedQuantity);
            const reducedQuantityAsString = String(reducedQuantity);
            const expectedText = `${reducedQuantityAsString} ${productData.product} purchased for`;
            const purchasedItem = await this.page.locator('.catalogue-item', {hasText: expectedText });
            await purchasedItem.waitFor();
            await expect (purchasedItem).toBeVisible();
    }
    

}