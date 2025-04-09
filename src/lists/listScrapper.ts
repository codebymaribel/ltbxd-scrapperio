import * as cheerio from 'cheerio';

import { FilmObject } from '../../types/films';
import { ListScrapperProps, ScrappedList } from '../../types/lists';
import { ERROR_MESSAGES, MAIN_URL, SCRAPPER_ERRORS } from '../config/constants';
import scrapper from '../scrapper/scrapper';
import { searchIMDB } from '../utils/utils';

export default async function listScrapper({
  url,
  options,
  contentType
}: ListScrapperProps): Promise<ScrappedList> {
  try {
    const initBrowser = await scrapper.launchBrowser();

    if (!initBrowser) {
      return {
        films: [],
        nextPageUrl: null,
        error: ERROR_MESSAGES.scrapper_method_failed,
      };
    }

    const htmlContent = await scrapper.getPageContent(url, contentType);

    if (!htmlContent?.content) {
      await scrapper.closeBrowser();
      return {
        films: [],
        nextPageUrl: null,
        error:
          htmlContent?.errorMessage || SCRAPPER_ERRORS.missing_html_content,
      };
    }

    const $ = cheerio.load(htmlContent.content);
    const filmContainers = $('div.film-poster > div').get();

    const films: FilmObject[] = [];

    for (const filmContainer of filmContainers) {
      let id: string | null;
      let poster: string | null;

      const $filmContainer = $(filmContainer);
      const fullname =
        $filmContainer.find('a').attr('data-original-title') || '';
      const name = fullname.split(' (')[0];
      const type = 'movie';

      if (options?.IMDBID) {
        id = await searchIMDB(name);
      } else {
        id = null;
      }

      if (options?.poster) {
        poster = $filmContainer.find('img').attr('src') || '';
      } else {
        poster = null;
      }
      films.push({ id, name, type, poster });
      if (films.length === options?.max) break;
    }
    const nextPage = $('a.next').attr('href');

    if (!nextPage) {
      await scrapper.closeBrowser();
      return { films, nextPageUrl: null, error: null };
    }
    const absoluteNextPageUrl = new URL(nextPage, MAIN_URL).href;

    return { films, nextPageUrl: absoluteNextPageUrl, error: null };
  } catch (error) {
    return {
      films: [],
      nextPageUrl: null,
      error: `${ERROR_MESSAGES.try_catch_failed}: ${error}`,
    };
  }
}
