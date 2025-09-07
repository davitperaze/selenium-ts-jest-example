import {
    Locator,
    WebDriver,
    WebElement,
    WebElementPromise,
    By,
} from "selenium-webdriver";

export class BasePage {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async open(url: string): Promise<void> {
        await this.navigateTo(url);
    }

    async getPageTitle(): Promise<string> {
        return await this.driver.getTitle();
    }

    async navigateTo(url: string): Promise<void> {
        await this.driver.get(url);
    }

    async findElement(locator: Locator): Promise<WebElement> {
        return await this.driver.findElement(locator);
    }

    async headerLogo(): Promise<WebElement> {
        return await this.findElement(
            By.css("[data-testid='header-brand-button']")
        );
    }

    async themeSwitcher(): Promise<WebElement> {
        return await this.findElement(
            By.css("[data-testid='theme-toggle-button']")
        );
    }

    async mainTitle(): Promise<WebElement> {
        const title = await this.findElement(
            By.css("[data-testid='main-title']")
        );

        return title;
    }

    async subTitle(): Promise<WebElement> {
        const title = await this.findElement(
            By.css("[data-testid='hero-subtitle']")
        );

        return title;
    }

    async getTheme(): Promise<string> {
        const htmlElement = await this.themeSwitcher();
        return await htmlElement.getAttribute("data-theme");
    }

    async getPreferedTheme(): Promise<string> {
        const isDarkMode = await this.driver.executeScript<boolean>(
            "return window.matchMedia('(prefers-color-scheme: dark)').matches"
        );
        return isDarkMode ? "dark" : "light";
    }

    protected findElements(locator: Locator): Promise<WebElement[]> {
        return this.driver.findElements(locator);
    }
    protected script(command: string) {
        return this.driver.executeScript(`
            return ${command}`);
    }

    async navigationtab(): Promise<WebElement> {
        return await this.findElement(By.css("[data-testid='category-nav']"));
    }
    async navigationTabButtons(): Promise<WebElement[]> {
        const navigationTabElement = await this.navigationtab();
        return await navigationTabElement.findElements(By.css("button"));
    }

    async activeNavigationTabButton(): Promise<WebElement> {
        return await this.findElement(
            By.css("[data-testid='category-nav'] button[data-active='true']")
        );
    }


}
