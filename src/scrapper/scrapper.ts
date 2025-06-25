import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import { scrollPageToBottom } from 'puppeteer-autoscroll-down';

import { ERROR_MESSAGES } from '../config/constants';
import { checkIfValidURL, timeout } from '../utils/utils';
import { PageContentResponse } from '../../types/scrapper';
import { PageContentType } from '../../types/lists';


class Scrapper {
  private browser: Browser | null;
  private page: Page | null;

  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser(): Promise<boolean> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
    if (!this.browser) return false;
    this.page = await this.browser.newPage();

    if (!this.page) return false;
    else return true;
  }

  async getPageContent(url: string, contentType: PageContentType): Promise<PageContentResponse> {
    const isTheURLValid = checkIfValidURL(url, contentType);

    if (!isTheURLValid) {
      return {
        content: null,
        errorMessage: ERROR_MESSAGES.not_valid_url,
      };
    }

    if (!this.page) {
      return {
        content: null,
        errorMessage: ERROR_MESSAGES.page_not_found,
      };
    }

    try {
      const urlResponse = await this.page.goto(url, {
        waitUntil: 'networkidle0',
      });

      if (urlResponse?.status() === 404) {
        return {
          content: null,
          errorMessage: ERROR_MESSAGES.page_not_found,
        };
      }

      await scrollPageToBottom(this.page, {
        size: 300,
        delay: 200,
      });

      await timeout(5000);

      const htmlContent = await this.page.content();

      return {
        content: htmlContent,
        errorMessage: null,
      };
    } catch (error) {
      return {
        content: null,
        errorMessage: `${ERROR_MESSAGES.scrapper_method_failed} - ${error}`,
      };
    }
  }

  async closeBrowser(): Promise<boolean> {
    try {
      if (!this.page) return true;
      await this.page.browser().close();
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkIfSelectorExists(selector: string): Promise<ElementHandle | null> {
    if (!this.page) return null;
    const doesSelectorExists = await this.page.waitForSelector(selector, {
      timeout: 1000,
    });

    return doesSelectorExists;
  }
}

export default new Scrapper();
