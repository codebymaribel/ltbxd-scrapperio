import * as cheerio from 'cheerio';

import { FilmSearchObject } from '../../types/films';
import { ScrappedSearch, SearchScrapperProps } from '../../types/search';
import { ERROR_MESSAGES, MAIN_URL, SCRAPPER_ERRORS } from '../config/constants';
import scrapper from '../scrapper/scrapper';

export const searchScrapper = async ({
  url,
  options,
  contentType,
}: SearchScrapperProps): Promise<ScrappedSearch> => {
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
    const filmContainers = $('section > div.search-table-body > ul.results > li').get();

    const films: FilmSearchObject[] = [];

    for (const filmContainer of filmContainers) {
      let poster: string | null = null;
      let alternativeTitles: string[] | null = [];
      let director: string | null = null;

      const $filmContainer = $(filmContainer);

      const title = $filmContainer
        .find('article > div.body > h2 > span > a')
        .text().trimEnd();
      const yearText = $filmContainer
        .find('article > div.body > h2 > span > small > a')
        .text();
      const year = parseInt(yearText, 10);

      if (options?.alternativeTitles) {
        const titlesString = $filmContainer
          .find('article > div.body > div.film-metadata > p')
          .text();
        alternativeTitles = titlesString
          .replace('Alternative titles: ', '')
          .split(',')
          .map((altTitle) => altTitle.trim());
      }

      if (options?.poster) {
        poster =
          $filmContainer.find('article > div.film-poster > div > img').attr('src') || '';
      }

      if (options?.director) {
        director = $filmContainer
          .find('article > div.body > p.film-metadata > a')
          .text();
      }
      films.push({
        title,
        year,
        alternativeTitles,
        poster,
        director,
      });

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
};
