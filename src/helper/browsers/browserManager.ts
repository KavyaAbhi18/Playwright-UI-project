import { LaunchOptions, chromium, firefox } from "@playwright/test";
import { error } from "console";

const options: LaunchOptions ={
    headless: false,

}

export const invokeBrowser = () => {
    const browserType =  process.env.BROWSER;
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        default:
            throw new Error("Please set the proper browser!");
            
            
    }
}