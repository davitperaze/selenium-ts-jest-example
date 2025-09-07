import { By, WebElement } from "selenium-webdriver";

export class CharacterCardComponent {
    constructor(private element: WebElement) {}

    async image(): Promise<WebElement> {
        return this.element.findElement(By.css("[data-testid^='character-card-image-']"));
    }

    async name(): Promise<WebElement> {
        return this.element.findElement(By.css("[data-testid^='card-name-']"));
    }

    async era(): Promise<WebElement> {
        return this.element.findElement(By.css("[data-testid^='card-era-']"));
    }

    async description(): Promise<WebElement> {
        return this.element.findElement(By.css("[data-testid^='card-description-']"));
    }

    async funFactButton(): Promise<WebElement> {
        return this.element.findElement(By.css("[data-testid^='card-fun-fact-button-']"));
    }
}
