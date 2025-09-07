import { By, WebElement, WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

class TimelinePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async timelineContainer(): Promise<WebElement> {
        return await this.waitAndFindElement(By.css("[data-testid='timeline-container']"));
    }
    async timelineCards(): Promise<WebElement[]> {
        return await this.findElements(By.css("[data-testid^='timeline-event-']"));
    }

    async timlineYear(context?: WebElement): Promise<WebElement> {
        const locator = By.css("[data-testid='timeline-year']");
        return context ? context.findElement(locator) : this.waitAndFindElement(locator);
    }
    async timelineTitle(context?: WebElement): Promise<WebElement> {
        const locator = By.css("[data-testid='timeline-title']");
        return context ? context.findElement(locator) : this.waitAndFindElement(locator);
    }
    async timelineDescription(context?: WebElement): Promise<WebElement> {
        const locator = By.css("[data-testid='timeline-description']");
        return context ? context.findElement(locator) : this.waitAndFindElement(locator);
    }

}

export default TimelinePage;
