import FriendsPage from "../pages/friends.page";
import strings from "../resources/strings";
import { createPageTests } from "../utils/test-setup";
import { runCharacterCardTests } from "./character-cards.shared";

createPageTests("Friends", FriendsPage, "friends", "Friends", (getPage) => {
    it(`Friends hero content title should be: ${strings.heroContent.friends?.title}`, async () => {
        const mainTitle = await getPage().getMainTitleText();
        expect(mainTitle).toBe(strings.heroContent.friends?.title);
    });

    it(`Sub title should be: ${strings.heroContent.friends?.subtitle}`, async () => {
        const subTitle = await getPage().getSubTitleText();
        expect(subTitle).toBe(strings.heroContent.friends?.subtitle);
    });

    runCharacterCardTests(() => getPage().friendCards(), "friend");
});
