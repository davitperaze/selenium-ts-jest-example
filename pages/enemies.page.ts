import { WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

class EnemiesPage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
}

export default EnemiesPage;
