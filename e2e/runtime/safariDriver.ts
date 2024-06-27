import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as safari from 'selenium-webdriver/safari';

/**
 * Creates a Selenium WebDriver using Safari as the browser.
 * @returns {ThenableWebDriver} Selenium web driver.
 */
export function SafariDriver(): ThenableWebDriver {
    const options = new safari.Options();
  
    const driver = new Builder()
      .forBrowser('safari')
      .setSafariOptions(options)
      .withCapabilities({
        browserName: 'safari',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        verboseLogging: true,
      })
      .build();
  
    return driver;
  }