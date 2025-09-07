import {
    Locator,
    WebDriver,
    By,
    WebElement, 
    until,
} from "selenium-webdriver";

export class BasePage {
    protected driver: WebDriver;
    protected timeout: number = 10000;
    
    protected locators = {
        headerLogo: By.css("[data-testid='header-brand-button']"),
        themeSwitcher: By.css("[data-testid='theme-toggle-button']"),
        mainTitle: By.css("[data-testid='main-title']"),
        subTitle: By.css("[data-testid='hero-subtitle']"),
        navigationTab: By.css("[data-testid='category-nav']"),
        navigationTabButtons: By.css("[data-testid='category-nav'] button"),
        activeNavigationTabButton: By.css(
            "[data-testid='category-nav'] button[data-active='true']"
        ),
    };

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async open(url: string): Promise<void> {
        await this.navigateTo(url);
    }

    async getPageTitle(): Promise<string> {
        return this.driver.getTitle();
    }

    async navigateTo(url: string): Promise<void> {
        await this.driver.get(url);
    }

    // Helper method for explicit waits
    protected async waitAndFindElement(locator: Locator): Promise<WebElement> {
        return this.driver.wait(until.elementLocated(locator), this.timeout);
    }

    // Action-oriented methods
    async clickHeaderLogo(): Promise<void> {
        const element = await this.waitAndFindElement(this.locators.headerLogo);
        await element.click();
    }

    async clickThemeSwitcher(): Promise<void> {
        const element = await this.waitAndFindElement(this.locators.themeSwitcher);
        await element.click();
    }

    async getMainTitleText(): Promise<string> {
        const element = await this.waitAndFindElement(this.locators.mainTitle);
        return element.getText();
    }

    async getSubTitleText(): Promise<string> {
        const element = await this.waitAndFindElement(this.locators.subTitle);
        return element.getText();
    }

    async getTheme(): Promise<string> {
        const element = await this.waitAndFindElement(this.locators.themeSwitcher);
        return element.getAttribute("data-theme");
    }

    async getPreferedTheme(): Promise<string> {
        const isDarkMode = await this.driver.executeScript<boolean>(
            "return window.matchMedia('(prefers-color-scheme: dark)').matches"
        );
        return isDarkMode ? "dark" : "light";
    }

    // Methods for retrieving elements for assertions
    async getHeaderLogo(): Promise<WebElement> {
        return this.waitAndFindElement(this.locators.headerLogo);
    }

    async getThemeSwitcher(): Promise<WebElement> {
        return this.waitAndFindElement(this.locators.themeSwitcher);
    }

    async getNavigationTabButtons(): Promise<WebElement[]> {
        return this.driver.findElements(this.locators.navigationTabButtons);
    }

    async getActiveNavigationTabButton(): Promise<WebElement> {
        return this.waitAndFindElement(this.locators.activeNavigationTabButton);
    }

    protected findElements(locator: Locator): Promise<WebElement[]> {
        return this.driver.findElements(locator);
    }
    protected script(command: string) {
        return this.driver.executeScript(`
            return ${command}`);
    }
}
