import { BasePage } from "../pages/base.page";
import strings from "../resources/strings";

export function runBaseTests(getPage: () => BasePage, activeTabText: string) {
    describe("Base page elements", () => {
        let basePage: BasePage;
        beforeAll(() => (basePage = getPage()));

        it("Logo and name should be shown", async () => {
            const headerLogo = await basePage.getHeaderLogo();
            expect(await headerLogo.isDisplayed()).toBe(true);
            expect(await headerLogo.getText()).toBe("DW Universe");
        });

        it("Theme switcher should be shown", async () => {
            const themeSwitcher = await basePage.getThemeSwitcher();
            expect(await themeSwitcher.isDisplayed()).toBe(true);
        });

        it(`Navigation tab should have buttons for each category ${strings.navigationItems}`, async () => {
            const navigationTabButtons = await basePage.getNavigationTabButtons();
            expect(navigationTabButtons.length).toBe(strings.navigationItems.length);
            const navigationTabButtonTexts = await Promise.all(navigationTabButtons.map((element) => element.getText()));
            expect(navigationTabButtonTexts).toEqual(strings.navigationItems);
        });

        it(`'${activeTabText}' navigation tab should be active`, async () => {
            const activeButton = await basePage.getActiveNavigationTabButton();
            const buttonText = await activeButton.getText();
            expect(buttonText).toBe(activeTabText);
        });
    });
}
