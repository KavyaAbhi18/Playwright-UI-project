export{};
    declare global {
        namespace NodeJS {
            interface ProcessEnv {
                BROWSER: "chrome" | "firefox";
                ENV: "test";
                BASEURL: string;
                HEAD: true | false
        }
    }
}