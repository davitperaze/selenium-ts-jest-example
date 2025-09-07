import { By, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./base.page";

class EnemiesPage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
    
        async enemyCards(): Promise<WebElement[]> {
        return await this.findElements(
            By.css("[data-testid^='character-card-enemy-']")
        );
    }
}

export default EnemiesPage;
