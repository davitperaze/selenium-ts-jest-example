import { Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import * as firefox from "selenium-webdriver/firefox";
import * as tmp from "tmp";

export interface DriverConfig {
    browser?: "chrome" | "firefox";
    windowSize?: {
        width: number;
        height: number;
    };
    headless?: boolean;
}

export const initializeDriver = async (
    config: DriverConfig = {}
): Promise<{
    driver: WebDriver;
    cleanup: (() => void) | null;
}> => {
    const browser = config.browser || "chrome";
    const windowSize = config.windowSize || { width: 1920, height: 1080 };
    const headless = config.headless ?? true;

    const builder = new Builder().forBrowser(browser);

    if (browser === "chrome") {
        const { path: userDataDir, cleanupCallback } = await new Promise<{
            path: string;
            cleanupCallback: () => void;
        }>((resolve, reject) => { // @ts-ignore: Parameter 'err' implicitly has an 'any' type.
            tmp.dir({ unsafeCleanup: true, prefix: "chrome-user-data-" }, (err, path, cleanupCallback) => {
                if (err) {
                    return reject(err);
                }
                resolve({ path, cleanupCallback });
            });
        });
        const options = new chrome.Options();
        options.addArguments(`--user-data-dir=${userDataDir}`);

        // Add arguments for CI/Docker environments.
        if (process.env.CI == "true") {
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
        }

        if (headless) {
            options.addArguments("--headless=new");
        }
        options.windowSize(windowSize);
        builder.setChromeOptions(options);

        const driver = await builder.build();
        await driver.manage().setTimeouts({ implicit: 5000 });
        return { driver, cleanup: cleanupCallback };
    } else if (browser === "firefox") {
        const options = new firefox.Options();
        if (headless) {
            options.addArguments("--headless");
            options.windowSize(windowSize);
        }
        builder.setFirefoxOptions(options);
        const driver = await builder.build();
        await driver.manage().setTimeouts({ implicit: 5000 });
        return { driver, cleanup: null };
    }

    const driver = await builder.build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    return { driver, cleanup: null };
};
