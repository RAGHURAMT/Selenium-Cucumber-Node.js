import { By } from 'selenium-webdriver';

const locators = {
  navMenu: By.css('.navigation__item-container.navigation__item-container--hidden'),
  firstrail:By.css('.carrousel.carrousel--with-arrows'),
  railItemList:By.css('section[aria-label="New & Trending"] li'),
  chevrons:By.css('.chevron.arrows__chevron'),
  chevron_next:By.css('section[aria-label="New & Trending"] button:nth-child(2)'),
  chevron_prev:By.css('section[aria-label="New & Trending"] button:nth-child(1)'),
  firstEpisodeItem:By.css('.carrousel.carrousel--with-arrows a'),
  btnStartWatching: By.css('[data-bbc-content-label = "start-watching"]')
};

export default locators;

