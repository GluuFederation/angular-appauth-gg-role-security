import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.card-title')).getText() as Promise<string>;
  }

  getLoginLinkElement() {
    return element(by.id('loginLink'));
  }

  getUsernameElement() {
    return element(by.id('loginForm:username'));
  }

  getPasswordElement() {
    return element(by.id('loginForm:password'));
  }

  getIDPLoginButtonElement() {
    return element(by.id('loginForm:loginButton'));
  }

  getAuthorizedAllowButtonElement() {
    return element(by.id('authorizeForm:allowButton'));
  }
}
