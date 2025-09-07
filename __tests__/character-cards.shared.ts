import { WebElement } from "selenium-webdriver";
import { CharacterCardComponent } from "../pages/components/character-card.component";

type CharacterType = "doctor" | "friend" | "enemy";

const funFactButtonText: Record<CharacterType, string> = {
    doctor: "Doctor Details",
    friend: "Friend Details",
    enemy: "Enemy Intel",
};

export function runCharacterCardTests(
    getCards: () => Promise<WebElement[]>,
    characterType: CharacterType
) {
    describe("Character Cards", () => {
        it("should have an image, name, era, description, and fun fact button", async () => {
            const cards = await getCards();
            expect(cards.length).toBeGreaterThan(0);

            for (const cardElement of cards) {
                const card = new CharacterCardComponent(cardElement);
                await expect(card.image()).resolves.toBeDefined();
                await expect(card.name()).resolves.toBeDefined();
                await expect(card.era()).resolves.toBeDefined();
                await expect(card.description()).resolves.toBeDefined();

                const funFactButton = await card.funFactButton();
                await expect(funFactButton).toBeDefined();
                await expect(funFactButton.getText()).resolves.toBe(funFactButtonText[characterType]);
            }
        });
    });
}
