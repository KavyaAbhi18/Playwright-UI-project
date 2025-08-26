import {Given, When,Then} from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture";
import ContactFormPage from "../../pages/ContactForm.page";

let contactPage : ContactFormPage;

 When('User provide those data', async function(){
       contactPage = new ContactFormPage(pageFixture.page);
       await contactPage.fillContactForm();

        })
