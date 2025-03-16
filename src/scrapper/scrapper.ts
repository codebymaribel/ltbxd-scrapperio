import puppeteer, { Browser, Page } from "puppeteer";

import { ERROR_MESSAGES } from "../config/constants";
import { checkIfValidURL } from "../utils/utils";

class Scrapper {
  private browser: Browser | null;
  private page: Page | null;

  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser(): Promise<boolean> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      });
      this.page = await this.browser?.newPage();

      if (this.page && this.browser) return true;
      else return false;
    } catch (error) {
      console.log(ERROR_MESSAGES.scrapper_method_failed);
      return false;
    }
  }

  async getPageContent(url: string) {
    const isTheURLValid = checkIfValidURL(url);

    if (!isTheURLValid) {
      return {
        content: null,
        errorMessage: ERROR_MESSAGES.not_valid_url,
      };
    }

    try {
      if (!this.page) return;
      const urlResponse = await this.page.goto(url, {
        waitUntil: "domcontentloaded",
      });

      if (urlResponse?.status() === 404) {
        return {
          content: null,
          errorMessage: ERROR_MESSAGES.page_not_found,
        };
      }

      const htmlContent = await this.page.content();

      return {
        content: htmlContent,
        errorMessage: null,
      };
    } catch (error) {
      if (!this.browser) return;
      await this.browser.close();
      return {
        content: null,
        errorMessage: `${ERROR_MESSAGES.scrapper_method_failed} - ${error}`,
      };
    }
  }

  async closeBrowser() {
    try {
      if (!this.page) return;
      await this.page.browser().close();
      console.log("browser closed");
      return true;
    } catch (error) {
      console.log("Error closing browser");
      return false;
    }
  }

  async checkIfSelectorExists(selector: string) {
    try {
      if (!this.page) return;
      const doesSelectorExists = await this.page
        .waitForSelector(selector, { timeout: 1000 })
        .then(() => true)
        .catch(() => false);

      return doesSelectorExists;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Scrapper();
