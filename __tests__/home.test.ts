import HomePage from "../pages/home.page";
import strings from "../resources/strings";
import { createPageTests } from "../utils/test-setup";

createPageTests("Home", HomePage, "", "Doctors", (getPage) => {
    it(`Main title should be: ${strings.heroContent.doctors?.title}`, async () => {
        const mainTitle = await getPage().mainTitle();
        const title = await mainTitle.getText();
        expect(title).toBe(strings.heroContent.doctors?.title);
    });

    it(`Sub title should be: ${strings.heroContent.doctors?.subtitle}`, async () => {
        const subTitle = await getPage().subTitle();
        const title = await subTitle.getText();
        expect(title).toBe(strings.heroContent.doctors?.subtitle);
    });
});
