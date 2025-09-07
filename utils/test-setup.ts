import { WebDriver } from "selenium-webdriver";
import config from "../config";
import { BasePage } from "../pages/base.page";
import * as fs from "fs/promises";
import { runBaseTests } from "../__tests__/base-setup";
import { DriverConfig, initializeDriver } from "./browser";

// Define a generic type for a Page Object class that extends BasePage
type PageObjectClass<T extends BasePage> = new (driver: WebDriver) => T;

/**
 * Creates a full test suite for a page, including driver setup,
 * teardown, base page tests, and page-specific tests.
 *
 * @param pageName The name of the page for the describe block (e.g., "Home").
 * @param PageObject The constructor of the page's PageObject class.
 * @param urlPath The path to append to the baseUrl for this page.
 * @param activeTabText The text of the navigation tab that should be active.
 * @param pageSpecificTests A function that contains the page-specific `it` blocks.
 */
export function createPageTests<T extends BasePage>(
    pageName: string,
    PageObject: PageObjectClass<T>,
    urlPath: string,
    activeTabText: string,
    pageSpecificTests: (getPage: () => T) => void,
) {
    describe(`${pageName} page tests`, () => {
        let driver: WebDriver;
        let page: T;
        let userDataDir: string | null;

        beforeAll(async () => {
            const driverSetup = await initializeDriver(config as DriverConfig);
            driver = driverSetup.driver;
            userDataDir = driverSetup.userDataDir;
            page = new PageObject(driver);
            await page.open(config.baseUrl + urlPath);
        });

        afterAll(async () => {
            await driver.quit();
            if (userDataDir) {
                await fs.rm(userDataDir, { recursive: true, force: true });
            }
        });

        // Run the common tests for the header and navigation
        runBaseTests(() => page, activeTabText);

        // Run the page-specific tests
        pageSpecificTests(() => page);
    });
}