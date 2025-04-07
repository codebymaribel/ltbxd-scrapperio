import * as cheerio from 'cheerio';

import {
  ListCoverObject,
  ScrappedLists,
  UserListsProps,
} from '../../types/lists';
import { ERROR_MESSAGES, MAIN_URL, SCRAPPER_ERRORS } from '../config/constants';
import scrapper from '../scrapper/scrapper';

export default async function userListsScrapper({
  url,
  options,
  totalItems = 0,
}: UserListsProps): Promise<ScrappedLists> {
  try {
    const initBrowser = await scrapper.launchBrowser();

    if (!initBrowser) {
      return {
        lists: [],
        nextPageUrl: null,
        error: ERROR_MESSAGES.scrapper_method_failed,
      };
    }

    const htmlContent = await scrapper.getPageContent(url);

    if (!htmlContent?.content) {
      await scrapper.closeBrowser();
      return {
        lists: [],
        nextPageUrl: null,
        error:
          htmlContent?.errorMessage || SCRAPPER_ERRORS.missing_html_content,
      };
    }

    const $ = cheerio.load(htmlContent.content);
    const listContainers = $('section.list').get();
    let currentLength = totalItems

    const lists: ListCoverObject[] = [];

    for (const listSection of listContainers) {
      console.log(options?.max, currentLength)
      if (options?.max === currentLength) {
        break;
      }
      let summary: string | null = null;
      let posters: string[] | null = null;
      let amount: string | null = null;

      const $listSection = $(listSection);
      const title = $listSection.find('div.film-list-summary > h2 > a').text();

      const url = MAIN_URL + $listSection.find('a').attr('href') || '';

      //@ts-ignore index not used
      if (options?.posters) {
        posters = $listSection
          .find('a > ul > li')
          //@ts-ignore aa
          .map((index, el) => $(el).find('div > img').attr('src'))
          .get();
      }

      if (options?.summary) {
        summary =
          $listSection.find('div.film-list-summary > div > p').text() || null;
      }

      if (options?.amount) {
        amount = $listSection.find('div.film-list-summary > p > small').text();
      }

      lists.push({ title, summary, amount, url, posters });
      currentLength++;
    }

    let nextPage: string | undefined | null = null;
    if (totalItems !== options?.max) nextPage = $('a.next').attr('href');

    if (!nextPage) {
      await scrapper.closeBrowser();
      return { lists, nextPageUrl: null, error: null };
    }
    const absoluteNextPageUrl = new URL(nextPage, MAIN_URL).href;

    return { lists, nextPageUrl: absoluteNextPageUrl, error: null };
  } catch (error) {
    return {
      lists: [],
      nextPageUrl: null,
      error: `${ERROR_MESSAGES.try_catch_failed}: ${error}`,
    };
  }
}
