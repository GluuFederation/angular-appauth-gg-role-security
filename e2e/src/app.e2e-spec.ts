import {AppPage} from './app.po';
import {browser, ExpectedConditions, logging} from 'protractor';
import {environment} from '../../src/environments/environment';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome in Gluu Security !!!');
  });

  it('should redirected to OP', async () => {
    expect(page.getLoginLinkElement().getText()).toEqual('Login');
    page.getLoginLinkElement().click();
    browser.driver.get(environment.openid_connect_url);
    await browser.waitForAngularEnabled(false);
    page.getUsernameElement().sendKeys('test');
    page.getPasswordElement().sendKeys('test@123');
    page.getIDPLoginButtonElement().click();
    page.getAuthorizedAllowButtonElement().isDisplayed().then((isDisplayed) => {
      debugger
      if (isDisplayed) {
        page.getAuthorizedAllowButtonElement().click();
      }
    });

    // page.getAuthorizedAllowButtonElement().click(); // Enable it for first time.
    browser.driver.get('http://localhost:4200');
    await browser.waitForAngularEnabled(true);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
