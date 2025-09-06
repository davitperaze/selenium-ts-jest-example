import { WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

class FriendsPage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
}

export default FriendsPage;
