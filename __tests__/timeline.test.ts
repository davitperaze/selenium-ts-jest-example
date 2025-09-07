import TimelinePage from "../pages/timeline.page";
import strings from "../resources/strings";
import { createPageTests } from "../utils/test-setup";

createPageTests("Timeline", TimelinePage, "timeline", "Timeline", (getPage) => {
    it(`Timeline hero content title should be: ${strings.heroContent.timeline?.title}`, async () => {
        const title = await getPage().getMainTitleText();
        expect(title).toBe(strings.heroContent.timeline?.title);
    });

    it(`Sub title should be: ${strings.heroContent.timeline?.subtitle}`, async () => {
        const subTitle = await getPage().getSubTitleText();
        expect(subTitle).toBe(strings.heroContent.timeline?.subtitle);
    });

    it(`Timeline container should be shown`, async () => {
        const timelineContainer = await getPage().timelineContainer();
        const timelineContainerShown = await timelineContainer.isDisplayed();
        expect(timelineContainerShown).toBe(true);
    });
    it(`Each timeline card should show year, title, and description`, async () => {
        const timelineCards = await getPage().timelineCards();
        expect(timelineCards.length).toBeGreaterThan(0);
        for (const card of timelineCards) {
            const year = await getPage().timlineYear(card);
            const title = await getPage().timelineTitle(card);
            const description = await getPage().timelineDescription(card);
            await expect(year.isDisplayed()).resolves.toBe(true);
            await expect(title.isDisplayed()).resolves.toBe(true);
            await expect(description.isDisplayed()).resolves.toBe(true);
        }
    });
});
