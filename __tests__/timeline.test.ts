import TimelinePage from "../pages/timeline.page";
import strings from "../resources/strings";
import { createPageTests } from "../utils/test-setup";

createPageTests("Timeline", TimelinePage, "timeline", "Timeline", (getPage) => {
    it(`Timeline hero content title should be: ${strings.heroContent.timeline?.title}`, async () => {
        const mainTitle = await getPage().mainTitle();
        const title = await mainTitle.getText();
        expect(title).toBe(strings.heroContent.timeline?.title);
    });

    it(`Sub title should be: ${strings.heroContent.timeline?.subtitle}`, async () => {
        const subTitle = await getPage().subTitle();
        const title = await subTitle.getText();
        expect(title).toBe(strings.heroContent.timeline?.subtitle);
    });

    it(`Timeline container should be shown`, async () => {
        const timelineContainer = await getPage().timelineContainer();
        const timelineContainerShown = await timelineContainer.isDisplayed();
        expect(timelineContainerShown).toBe(true);
    });
});
