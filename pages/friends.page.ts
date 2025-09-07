import { By, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./base.page";

class FriendsPage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async friendCards(): Promise<WebElement[]> {
        return await this.findElements(
            By.css("[data-testid^='character-card-friend-']")
        );
    }
}

export default FriendsPage;
