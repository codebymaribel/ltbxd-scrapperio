/**
 * DISCLAIMER: This project is for portfolio purposes only.
 * It demonstrates web scraping techniques and TypeScript development.
 * Users should comply with Letterboxd's Terms of Use.
 * Not intended for production use or distribution.
 */
import {
  FilmsResponseProps,
  ListProps,
  ListsResponseProps,
  SearchProps,
  SearchResponseProps,
  UserListsProps,
  UserQueryProps,
} from '../types';
import { FilmObject, FilmSearchObject } from '../types/films';
import { ListCoverObject } from '../types/lists';
import {
  CONTENT_TYPE,
  ERROR_MESSAGES,
  MAIN_URL,
  PROJECT_MANAGER_MESSAGES,
  QUERY_RESULT_STATUS,
} from './config/constants';
import { limitWrapper } from './limits/limit-wrapper';
import { projectManager } from './limits/project-manager';
import userListsScrapper from './lists/UserLists';
import listScrapper from './lists/listScrapper';
import { searchScrapper } from './lists/searchScrapper';

/**
 * @summary Gets user watchlist
 * @description This function returns an array of objects with user's watchlist films data.
 * @param {string} username - Letterboxd username
 * @param {object} options - OptionsProps
 * @returns {object}  FilmsResponseProps
 */

export const getWatchlist = async ({
  username,
  options = {
    IMDBID: true,
    poster: true,
  },
}: UserQueryProps): Promise<FilmsResponseProps> => {
  return limitWrapper(async () => {


    if (!projectManager.requireTermsAcknowledgment()) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: [],
        errorMessage: PROJECT_MANAGER_MESSAGES.terms_not_acknowledged,
      };
    }

    const rateCheck = projectManager.checkRateLimits();

    if (!rateCheck.allowed) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: [],
        errorMessage: rateCheck.message || 'Rate limit exceeded',
      };
    }

    if (!username) {
      return {
        status: QUERY_RESULT_STATUS.failed,
        data: [],
        errorMessage: ERROR_MESSAGES.missing_parameters,
      };
    }

    let options_selected = options;

    if (options && !('IMDBID' in options))
      Object.assign(options_selected, { IMDBID: true });
    if (options && !('poster' in options))
      Object.assign(options_selected, { poster: true });

    let currentUrl: string | null =
      `${MAIN_URL}/${username}/${CONTENT_TYPE.WATCHLIST}/`;

    const allFilms: FilmObject[] = [];
    let triggeredError: string | null = null;

    while (currentUrl) {
      const { films, nextPageUrl, error } = await listScrapper({
        url: currentUrl,
        contentType: 'watchlist',
        options: options_selected,
      });

      allFilms.push(...films);
      const isMaxReached = allFilms.length === options?.max;

      if (isMaxReached) {
        currentUrl = null;
        break;
      } else if (error) {
        if (error) {
          triggeredError = error;
        }
        currentUrl = null;
        break;
      }

      currentUrl = nextPageUrl;
    }

    if (triggeredError) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: allFilms,
        errorMessage: triggeredError,
      };
    }

    return {
      status: QUERY_RESULT_STATUS.ok,
      data: allFilms,
      errorMessage: null,
    };
  });
};

/**
 * @summary Gets user lists
 * @description This function returns an array of objects with user's lists data.
 * @param {string} username - Letterboxd username
 * @param {object} options - UserListsProps
 * @returns {object}  ListsResponseProps
 */

export const getUserLists = async ({
  username,
  options = {
    posters: true,
    summary: true,
    amount: true,
  },
}: UserListsProps): Promise<ListsResponseProps> => {
  return limitWrapper(async () => {
    if (!username) {
      return {
        status: QUERY_RESULT_STATUS.failed,
        data: [],
        errorMessage: ERROR_MESSAGES.missing_parameters,
      };
    }

    const rateCheck = projectManager.checkRateLimits();

    if (!rateCheck.allowed) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: [],
        errorMessage: rateCheck.message || 'Rate limit exceeded',
      };
    }

    let options_selected = options;

    if (options && !('posters' in options))
      Object.assign(options_selected, { posters: true });
    if (options && !('summary' in options))
      Object.assign(options_selected, { summary: true });
    if (options && !('amount' in options))
      Object.assign(options_selected, { amount: true });

    let currentUrl: string | null =
      `${MAIN_URL}/${username}/${CONTENT_TYPE.LISTS}/`;

    const allLists: ListCoverObject[] = [];
    let triggeredError: string | null = null;

    while (currentUrl) {
      const { lists, nextPageUrl, error } = await userListsScrapper({
        url: currentUrl,
        totalItems: allLists.length,
        contentType: 'lists',
        options: options_selected,
      });

      allLists.push(...lists);
      const isMaxReached = allLists.length === options?.max;

      if (isMaxReached) {
        currentUrl = null;
        break;
      } else if (error) {
        if (error) {
          triggeredError = error;
        }
        currentUrl = null;
        break;
      }
      currentUrl = nextPageUrl;
    }

    if (triggeredError) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: allLists,
        errorMessage: triggeredError,
      };
    }

    return {
      status: QUERY_RESULT_STATUS.ok,
      data: allLists,
      errorMessage: null,
    };
  });
};

/**
 * @summary Gets list films based on list url
 * @description This function returns an array of objects with list films data.
 * @param {string} url - Letterboxd list url
 * @param {object} options - ListProps
 * @returns {object}  FilmsResponseProps
 */

export const getListFilms = async ({
  url,
  options = {
    IMDBID: true,
    poster: true,
  },
}: ListProps): Promise<FilmsResponseProps> => {
  return limitWrapper(async () => {
    if (!url) {
      return {
        status: QUERY_RESULT_STATUS.failed,
        data: [],
        errorMessage: ERROR_MESSAGES.missing_parameters,
      };
    }

    const rateCheck = projectManager.checkRateLimits();

    if (!rateCheck.allowed) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: [],
        errorMessage: rateCheck.message || 'Rate limit exceeded',
      };
    }

    let options_selected = options;

    if (options && !('IMDBID' in options))
      Object.assign(options_selected, { IMDBID: true });
    if (options && !('poster' in options))
      Object.assign(options_selected, { poster: true });

    let currentUrl: string | null = url;

    const allFilms: FilmObject[] = [];
    let triggeredError: string | null = null;

    while (currentUrl) {
      const { films, nextPageUrl, error } = await listScrapper({
        url: currentUrl,
        contentType: CONTENT_TYPE.LIST,
        options: options_selected,
      });

      allFilms.push(...films);
      const isMaxReached = allFilms.length === options?.max;

      if (isMaxReached) {
        currentUrl = null;
        break;
      } else if (error) {
        if (error) {
          triggeredError = error;
        }
        currentUrl = null;
        break;
      }

      currentUrl = nextPageUrl;
    }

    if (triggeredError) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: allFilms,
        errorMessage: triggeredError,
      };
    }

    return {
      status: QUERY_RESULT_STATUS.ok,
      data: allFilms,
      errorMessage: null,
    };
  });
};

/**
 * @summary Gets search results based on search query
 * @description This function returns an array of objects with search results data.
 * @param {string} title - Search query
 * @param {object} options - SearchProps
 * @returns {object}  SearchResponseProps
 */
export const searchFilm = async ({
  title,
  options = {
    poster: true,
    alternativeTitles: true,
    director: true,
  },
}: SearchProps): Promise<SearchResponseProps> => {
  return limitWrapper(async () => {
    if (!title) {
      return {
        status: QUERY_RESULT_STATUS.failed,
        data: [],
        errorMessage: ERROR_MESSAGES.missing_parameters,
      };
    }

    const rateCheck = projectManager.checkRateLimits();

    if (!rateCheck.allowed) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: [],
        errorMessage: rateCheck.message || 'Rate limit exceeded',
      };
    }

    let options_selected = options;

    if (options && !('poster' in options))
      Object.assign(options_selected, { poster: true });
    if (options && !('alternativeTitles' in options))
      Object.assign(options_selected, { alternativeTitles: true });

    if (options && !('director' in options))
      Object.assign(options_selected, { director: true });

    let formattedQuery = title.replace(' ', '+');
    let searchquery: string | null =
      `${MAIN_URL}/search/films/${formattedQuery}/`;

    const allFilms: FilmSearchObject[] = [];

    let triggeredError: string | null = null;

    while (searchquery) {
      const { films, nextPageUrl, error } = await searchScrapper({
        url: searchquery,
        contentType: 'search',
        options: options_selected,
      });

      allFilms.push(...films);
      const isMaxReached = allFilms.length === options?.max;

      if (isMaxReached) {
        searchquery = null;
        break;
      } else if (error) {
        if (error) {
          triggeredError = error;
        }
        searchquery = null;
        break;
      }

      searchquery = nextPageUrl;
    }

    if (triggeredError) {
      return {
        status: QUERY_RESULT_STATUS.error,
        data: allFilms,
        errorMessage: triggeredError,
      };
    }

    return {
      status: QUERY_RESULT_STATUS.ok,
      data: allFilms,
      errorMessage: null,
    };
  });
};
