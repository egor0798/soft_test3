import { protractor, browser, element, by } from "protractor";

const USER = "";
const PASS = "";

describe('Tests without authorization', () => {
    let originalTimeout;
    const MAIN_PAGE_URL: string = 'https://spb.hh.ru/';

    beforeEach(async () => {
        browser.ignoreSynchronization = true;
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

        await browser.get(MAIN_PAGE_URL);
        await browser.wait(protractor.ExpectedConditions.urlIs(MAIN_PAGE_URL), 5000);
        // await element(by.xpath("//button[contains(@class, 'supernova-region-clarification-text')]")).click();
    });

    afterEach(async () => {
        browser.ignoreSynchronization = true;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

    });

    it('Change search region test', async () => {

        const regionButton = element(by.xpath("//button[contains(@class, 'bloko-link-switch_tertiary')]"));
        const regionInput = element(by.xpath("//input[@id='area-search-input']"));
        const dropDownElements = element(by.xpath("(//ul[contains(@class, 'suggest__items Bloko-Suggest-List suggest__items_hover_enabled')]//li)[1]"));

        await regionButton.click();
        await browser.wait(protractor.ExpectedConditions.presenceOf(regionInput), 5000);
        await regionInput.sendKeys("Москва");
        await browser.sleep(500);
        await regionInput.sendKeys(protractor.Key.ARROW_DOWN);
        await regionInput.sendKeys(protractor.Key.ENTER);
        await browser.wait(protractor.ExpectedConditions.urlContains('https://hh.ru/'));
    });

    it('Find jobs', async () => {
        const search = element(by.xpath("//input[contains(@class, 'HH-Supernova-Search-Hint-Input')]"));
        const jobsList = element(by.xpath("//div[contains(@class, 'vacancy-serp')]"));

        await search.sendKeys('frontend developer');
        await search.sendKeys(protractor.Key.ENTER);
        await browser.wait(protractor.ExpectedConditions.presenceOf(jobsList), 5000);
    });

    it('Check 1sr job', async () => {
        //div[contains(@class, '')]
        const search = element(by.xpath("//input[contains(@class, 'HH-Supernova-Search-Hint-Input')]"));
        const jobsList = element(by.xpath("//div[contains(@class, 'vacancy-serp')]"));
        const firstJobHeader = element(by.xpath("(//div[contains(@class, 'vacancy-serp-item')])[1]//div[contains(@class, 'vacancy-serp-item__info')]//a"));
        const applyButton = element(by.xpath("//div[contains(@class, 'vacancy-action')]//a[contains(@class, 'bloko-button_secondary')]"));
        // const applyButton = element(by.xpath("//div[contains(@class, 'vacancy-action')]"));

        await search.sendKeys('frontend developer', protractor.Key.ENTER);
        await browser.wait(protractor.ExpectedConditions.presenceOf(jobsList), 5000, '\nJL');
        await browser.wait(protractor.ExpectedConditions.presenceOf(firstJobHeader), 5000, '\nJH');
        await firstJobHeader.click();

        let secondWindowHandle;
        let firstWindowHandle;
        await browser.getAllWindowHandles().then(async (handles) => {
            secondWindowHandle = handles[1];
            firstWindowHandle = handles[0];
        }
        );
        await browser.switchTo().window(secondWindowHandle);

        await browser.wait(protractor.ExpectedConditions.presenceOf(applyButton), 3000);
        await browser.sleep(1000);
    });

    it('Find workers', async () => {
        await browser.get('https://hh.ru/employer');
        const search = element(by.xpath("//input[contains(@class, 'HH-Supernova-Search-Hint-Input')]"));

        await search.sendKeys('frontend developer', protractor.Key.ENTER);
        await browser.sleep(1000);
    });

    it('Check 1sr worker', async () => {
        const search = element(by.xpath("//input[contains(@class, 'HH-Supernova-Search-Hint-Input')]"));
        const firstJobHeader = element(by.xpath("(//div[contains(@class, 'resume-search-item__header')])[1]//a"));

        await browser.get('https://hh.ru/employer');

        await search.sendKeys('frontend developer', protractor.Key.ENTER);

        await browser.wait(protractor.ExpectedConditions.presenceOf(firstJobHeader), 3000);
        await firstJobHeader.click();

        let secondWindowHandle;
        let firstWindowHandle;
        await browser.getAllWindowHandles().then(async (handles) => {
              secondWindowHandle = handles[1];
              firstWindowHandle = handles[0];
          }
        );
        await browser.switchTo().window(secondWindowHandle);
        await browser.sleep(1000);
    });

    it('Authorize', async () => {
      await browser.get('https://spb.hh.ru/account/login');
      const username = element(by.xpath("//input[@name='username']"));
      const password = element(by.xpath("//input[@name='password']"));
      const submitButton = element(by.xpath("//div[contains(@class, 'account-form-actions')]/input"));

      await browser.wait(protractor.ExpectedConditions.presenceOf(username), 5000);
      await username.sendKeys(USER);
      await password.sendKeys(PASS);
      await submitButton.click();
    });
});
