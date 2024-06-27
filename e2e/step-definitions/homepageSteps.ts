import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import {Builder, until, WebDriver } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import { config } from '../config/config';
import homepageObjects from '../pageObjects/homepage';

setDefaultTimeout(30000);

Given('I am on the BBC iPlayer homepage', async function () {
  await this.driver.get(config.url);
  await this.driver.wait(until.elementLocated(homepageObjects.navMenu));
});

Then('the page title should be {string}', async function (title: string) {
  const pageTitle = await this.driver.getTitle();
  assert.equal(pageTitle, title);
});

Then('there should be one iPlayer navigation menu', async function () {
  const navMenus = await this.driver.findElements(homepageObjects.navMenu);
  assert.strictEqual(navMenus.length, 1);
});

Then('there should be at least 4 sections with carousels', async function () {
  const sections = await this.driver.findElements(homepageObjects.firstrail);
  assert.ok(sections.length >= 4, `Expected at least 4 sections, but found ${sections.length}`);
});

Then('each carousel should contain at least 4 programme items', async function () {
  const sections = await this.driver.findElements(homepageObjects.railItemList);
  assert.ok(sections.length >= 4, `Expected at least 4 items in carousel`);
});

Then('there are carousels on the page', async function () {
  await this.driver.sleep(1500);
  const sections1 = await this.driver.findElements(homepageObjects.chevrons);
  assert.ok(sections1.length >= 8, `Expected at least 8 carousels present on the screen`);
});

When('I click the carousel arrow', async function () {
  const arrow = await this.driver.findElement(homepageObjects.chevron_next);
  await arrow.click();
});

Then('more items should be shown in the carousel', async function () {
  const nextButton = await this.driver.findElement(homepageObjects.chevron_next);
  while (await nextButton.isEnabled()) {
    await nextButton.click();
    await this.driver.sleep(1000);
  }
  const isEnabled = await this.driver.findElement(homepageObjects.chevron_prev).isEnabled();
  if (isEnabled) {
    console.log("Chevron previous Button is enabled.");
  } else {
    assert.fail("Chevron previous Button is not enabled");
  }
});

When('I click on an episode in the carousel',{ timeout: 30000 }, async function () {
  await this.driver.sleep(2000);
  await this.driver.findElement(homepageObjects.firstEpisodeItem).click();
});

Then('the episodes page should be displayed', { timeout: 30000 }, async function () {
  if (!this.driver) {
    throw new Error('Driver not initialized');
  }
  await this.driver.wait(until.elementLocated(homepageObjects.btnStartWatching));
  await this.driver.wait(until.urlContains(config.url+'episodes/'), 10000);
  const currentUrl = await this.driver.getCurrentUrl();
  assert.ok(currentUrl.includes('episodes'), `Expected "${currentUrl}" to contain "episodes"`);
});