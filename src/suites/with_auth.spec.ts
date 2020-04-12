import { protractor, browser, element, by } from "protractor";

describe('With authorization', () => {
  let originalTimeout;
  const MAIN_PAGE_URL: string = 'https://spb.hh.ru/';
  const ec = protractor.ExpectedConditions;
  const USER = "";
  const PASS = "";

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    await loginFunc();
  });

  beforeEach(async () => {
    browser.ignoreSynchronization = true;
    // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    // await loginFunc();
    await browser.get(MAIN_PAGE_URL);
    await browser.wait(protractor.ExpectedConditions.urlIs(MAIN_PAGE_URL), 5000);
  });

  const loginFunc = async () => {
    await browser.get('https://spb.hh.ru/account/login');
    const username = element(by.xpath("//input[@name='username']"));
    const password = element(by.xpath("//input[@name='password']"));
    const submitButton = element(by.xpath("//div[contains(@class, 'account-form-actions')]/input"));

    await browser.wait(protractor.ExpectedConditions.presenceOf(username), 5000);
    await username.sendKeys(USER);
    await password.sendKeys(PASS);
    await submitButton.click();
  };

  afterEach(async () => {
    // browser.ignoreSynchronization = true;
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

  });

  it('Check my resume', async () => {
    const resumeHeader = element(by.xpath("//a[contains(@class, 'applicant-resumes-title')]"));
    // await loginFunc();

    await browser.get('https://spb.hh.ru/applicant/resumes');
    await browser.wait(protractor.ExpectedConditions.presenceOf(resumeHeader), 5000);
    await resumeHeader.click();
    await browser.sleep(1000);
  });

  it('Check all responses', async () => {
    const resumeHeader = element(by.xpath("//a[contains(@class, 'applicant-resumes-title')]"));
    // await loginFunc();

    await browser.get('https://spb.hh.ru/applicant/negotiations');
    await browser.get('https://spb.hh.ru/applicant/negotiations?filter=all');
    await browser.wait(protractor.ExpectedConditions.presenceOf(resumeHeader), 5000);
    await resumeHeader.click();
    await browser.sleep(1000);
  });

  it('Check positive resp', async () => {
    const select = element(by.xpath("//select[contains(@class, 'bloko-select_flexible')]"));
    const optionPositive = element(by.xpath("//option[@value = 'INVITATION']"));
    // await loginFunc();

    await browser.get('https://spb.hh.ru/applicant/negotiations');
    await browser.get('https://spb.hh.ru/applicant/negotiations?filter=all');

    await browser.wait(protractor.ExpectedConditions.presenceOf(select), 3000);
    await select.click();
    await optionPositive.click();
    await browser.sleep(1000);
  });

  it('Check profile settings', async () => {
    const profileBtn = element(by.xpath("(//span[contains(@class, 'supernova-icon-dynamic')]//button[contains(@class, 'HH-Supernova-Menu-Activator')])[2]"));
    const settingsButton = element(by.xpath("(//div[contains(@class, 'supernova-dropdown')]//a)[1]"));
    // await loginFunc();


    await browser.wait(protractor.ExpectedConditions.presenceOf(profileBtn), 3000);
    await profileBtn.click();
    await browser.sleep(1000);
    settingsButton.click();
    await browser.sleep(1000);
  });

  xit('Apply for a job', async () => {
    const search = element(by.xpath("//input[contains(@class, 'HH-Supernova-Search-Hint-Input')]"));
    const jobsList = element(by.xpath("//div[contains(@class, 'vacancy-serp')]"));
    const firstJobHeader = element(by.xpath("(//div[contains(@class, 'vacancy-serp-item')])[1]//div[contains(@class, 'vacancy-serp-item__info')]//a"));
    const applyButton = element(by.xpath("//div[contains(@class, 'vacancy-action')]//a[contains(@class, 'bloko-button_secondary')]"));
    const windowApplyButton = element(by.xpath("//div[contains(@class, 'HH-VacancyResponsePopup-Submit')]"));

    // await loginFunc();
    await browser.wait(protractor.ExpectedConditions.presenceOf(search), 5000);
    await search.sendKeys('frontend developer');
    await search.sendKeys(protractor.Key.ENTER);
    // await browser.wait(protractor.ExpectedConditions.presenceOf(jobsList), 5000, '\nJL');
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
    await applyButton.click();

    await browser.sleep(1000);
    await browser.switchTo().window(firstWindowHandle);
  });
});
