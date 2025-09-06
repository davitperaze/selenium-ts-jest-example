import { WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

class HomePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
}

export default HomePage;
