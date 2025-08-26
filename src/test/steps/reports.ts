import {Given, When,Then} from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture";

import ReportPage from "../../pages/Report.page";



let reportPage : ReportPage



When('User serach the word {string}', async function (searchReport: string) {
        reportPage = new ReportPage(pageFixture.page)
        await reportPage.searchReport(searchReport);
         
});
 Then('Report should show the {string} filtered data', async function (searchedReport: string) {
        await reportPage.validateSearcedReportIsVisible(searchedReport);
});
