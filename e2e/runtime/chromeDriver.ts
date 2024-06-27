import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';

/**
 * Creates a Selenium WebDriver using Chrome as the browser.
 * @param {string[]} args - Array of Chrome options.
 * @returns {ThenableWebDriver} Selenium web driver.
 */
export function ChromeDriver(args: string[] = ['start-maximized']): ThenableWebDriver {
  const options = new chrome.Options();
  options.addArguments(...args);

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .withCapabilities({
      browserName: 'chrome',
      javascriptEnabled: true,
      acceptSslCerts: true,
      acceptInsecureCerts: true,
      verboseLogging: true,
    })
    .setChromeService(new chrome.ServiceBuilder(chromedriver.path))
    .build();

  return driver;
}
