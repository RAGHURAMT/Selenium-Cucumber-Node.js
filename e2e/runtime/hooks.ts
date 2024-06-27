import { Before, After } from '@cucumber/cucumber';
import { WebDriver } from 'selenium-webdriver';
import { ChromeDriver } from './chromeDriver';
import { FirefoxDriver } from './firefoxDriver';
import { SafariDriver } from './safariDriver';

const browserName = process.env.BROWSER || 'chrome';

Before(async function () {
  let driver: WebDriver;

  switch (browserName.toLowerCase()) {
    case 'firefox':
      driver = FirefoxDriver();
      break;
    case 'safari':
      driver = SafariDriver();
      break;
    case 'chrome':
    default:
      driver = ChromeDriver();
  }

  this.driver = driver;
});

After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
