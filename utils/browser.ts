import { Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import * as firefox from "selenium-webdriver/firefox";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

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
): Promise<WebDriver> => {
    const browser = config.browser || "chrome";
    const windowSize = config.windowSize || { width: 1920, height: 1080 };
    const headless = config.headless ?? true;

    const builder = new Builder().forBrowser(browser);

    if (browser === "chrome") {
        const options = new chrome.Options();

        // Use a temporary user data directory to avoid session conflicts,
        // especially in CI environments where multiple instances mugh run.
        const userDataDir = fs.mkdtempSync(
            path.join(os.tmpdir(), "chrome-user-data-")
        );
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
    } else if (browser === "firefox") {
        const options = new firefox.Options();
        if (headless) {
            options.addArguments("-headless");
            options.windowSize(windowSize);
        }
        builder.setFirefoxOptions(options);
    }

    const driver = await builder.build();

    await driver.manage().setTimeouts({ implicit: 5000 });

    return driver;
};
