import puppeteer from 'puppeteer';

import { ERROR_MESSAGES, MAIN_URL } from '../src/config/constants';
import scrapper from '../src/scrapper/scrapper';
import {
  puppeteerBrowserOK,
  puppeteerPage404,
  puppeteerPageNull,
} from './__mocks__/puppeteer';
import { full_list_html } from './__mocks__/watchlist_mock';

jest.mock('puppeteer');

const testValidURL = `${MAIN_URL}+/testurl+/list`;

describe('launchBrowser function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should return launchBrowser as true', async () => {
    const response = await scrapper.launchBrowser();

    expect(response).toBeTruthy();
  });

  it('Should return launchBrowser as false', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerPageNull);
    const response = await scrapper.launchBrowser();

    expect(response).toBeFalsy();
  });
});

describe('getPageContent function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return content as null & errorMessage as URL not valid', async () => {
    const response = await scrapper.getPageContent('testurl', 'list');

    expect(response?.content).toBeNull();
    expect(response?.errorMessage).toBe(ERROR_MESSAGES.not_valid_url);
  });

  it('Should return no content & errorMessage if this.page is null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerPageNull);
    await scrapper.launchBrowser();

    const response = await scrapper.getPageContent(testValidURL, 'list');

    expect(response?.content).toBeNull();
    expect(response?.errorMessage).toBe(ERROR_MESSAGES.page_not_found);
  });

  it('Should return no content & errorMessage if page.goto res status is 404', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerPage404);
    await scrapper.launchBrowser();

    const response = await scrapper.getPageContent(testValidURL, 'list');

    expect(response?.content).toBeNull();
    expect(response?.errorMessage).toBe(ERROR_MESSAGES.page_not_found);
  });

  it('Should return getPageContent with content & errorMessage null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerBrowserOK);
    await scrapper.launchBrowser();
    const response = await scrapper.getPageContent(testValidURL, 'list');

    expect(response?.content).toBe(full_list_html);
    expect(response?.errorMessage).toBe(null);
  }, 10000);
});

describe('closeBrowser function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return true if page is null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerPageNull);
    await scrapper.launchBrowser();
    const response = await scrapper.closeBrowser();

    expect(response).toBeTruthy();
  });

  it('Should return true if browser.close returns ok', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerBrowserOK);
    await scrapper.launchBrowser();
    const response = await scrapper.closeBrowser();

    expect(response).toBeTruthy();
  });
});

describe('checkIfSelectorExists function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return true if page is null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerPageNull);
    await scrapper.launchBrowser();
    const response = await scrapper.closeBrowser();

    expect(response).toBeTruthy();
  });

  it('Should return false if selector exists', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerPage404);
    await scrapper.launchBrowser();
    const response = await scrapper.checkIfSelectorExists('testSelector');

    expect(response).toBeFalsy();
  });

  it('Should return true if selector exists', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    puppeteer.launch.mockResolvedValue(puppeteerBrowserOK);
    await scrapper.launchBrowser();
    const response = await scrapper.checkIfSelectorExists('testSelector');

    expect(response).toBeTruthy();
  });
});
