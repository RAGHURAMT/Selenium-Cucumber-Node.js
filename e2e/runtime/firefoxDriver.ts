import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox';

/**
 * Creates a Selenium WebDriver using Firefox as the browser.
 * @param {string[]} args - Array of Firefox options.
 * @returns {ThenableWebDriver} Selenium web driver.
 */
export function FirefoxDriver(args: string[] = []): ThenableWebDriver {
  const options = new firefox.Options();
  options.addArguments(...args);

  const driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .withCapabilities({
      browserName: 'firefox',
      javascriptEnabled: true,
      acceptSslCerts: true,
      acceptInsecureCerts: true,
      verboseLogging: true,
    })
    .build();

  return driver;
}
