import {expect, Page} from "@playwright/test";
import * as contactFormData from '../helper/util/test-data/contactForm.json';



export default class ContactFormPage {

     constructor(private  page: Page){
        this.page = page;

    }
 

      private elements = {
        firstName: "First Name:",
        lastName: "Last Name:",
        address1: "Address Line 1:",
        address2: "Address Line 2:",
        address3: "Address Line 3:",
        address4: "Address Line 4:",
        pet: "#dog",
        agreeCheckbox: "#checkbox"

    }

    async fillContactForm(){
       const firstNameField = await this.page.getByLabel(this.elements.firstName);
       await firstNameField.fill(contactFormData.firstName);
       //validation step     
       await expect(firstNameField).toHaveValue('Kavyashree');
       const firstNamevalue = await firstNameField.inputValue();
       console.log("The first name is : ", firstNamevalue)

       const lastNameField = await this.page.getByLabel(this.elements.lastName);
       await lastNameField.fill(contactFormData.lastname);
       const address1Field = await this.page.getByLabel(this.elements.address1);
       await address1Field.fill(contactFormData.address1);
       const address2Field = await this.page.getByLabel(this.elements.address2);
       await address2Field.fill(contactFormData.address2);
       const address3Field = await this.page.getByLabel(this.elements.address3);
       await address3Field.fill(contactFormData.address3);
       const address4Field = await this.page.getByLabel(this.elements.address4);
       await address4Field.fill(contactFormData.address4);
       const pet = await this.page.locator(this.elements.pet);
       await pet.click();
       const agreeCheckbox = await this.page.locator(this.elements.agreeCheckbox);
       await agreeCheckbox.click();

    }


}