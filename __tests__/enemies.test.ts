import EnemiesPage from "../pages/enemies.page";
import strings from "../resources/strings";
import { createPageTests } from "../utils/test-setup";
import { runCharacterCardTests } from "./character-cards.shared";


createPageTests("Enemies", EnemiesPage, "enemies", "Enemies", (getPage) => {
    it(`Enemies hero content title should be: ${strings.heroContent.enemies?.title}`, async () => {
        const title = await getPage().getMainTitleText();
        expect(title).toBe(strings.heroContent.enemies?.title);
    });

    it(`Sub title should be: ${strings.heroContent.enemies?.subtitle}`, async () => {
        const title = await getPage().getSubTitleText();
        expect(title).toBe(strings.heroContent.enemies?.subtitle);
    });

    runCharacterCardTests(() => getPage().enemyCards(), "enemy");

});
