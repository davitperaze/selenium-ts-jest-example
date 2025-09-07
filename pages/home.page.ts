import { WebElement, By, WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

class HomePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async doctorCards(): Promise<WebElement[]> {
        return await this.findElements(
            By.css("[data-testid^='character-card-doctor-']")
        );
    }
}

export default HomePage;
