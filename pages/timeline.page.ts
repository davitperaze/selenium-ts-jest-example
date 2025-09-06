import { By, WebElement, WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

class TimelinePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async timelineContainer(): Promise<WebElement> {
        return await this.findElement(By.css("[data-testid='timeline-container']"));
    }
}

export default TimelinePage;
