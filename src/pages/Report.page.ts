import {expect, Page} from "@playwright/test";
import * as productData from '../helper/util/test-data/product.json';


export default class ReportPage {

 constructor(private  page: Page){
        this.page = page;

    }

    private elements = {
        searchReportField: "Search general ledger...",
    }

async searchReport(searchData: string){
        const searchReport = await this.page.getByPlaceholder(this.elements.searchReportField);
        await searchReport.fill(searchData);
    }

    async validateSearcedReportIsVisible(searchedReport: string){
       const report = await this.page.locator(`//*[text()="${searchedReport}"]`);
       await expect(report).toBeVisible();
       console.log(`The searched report '${searchedReport}' is visible`);
      


    }
}    