import {
  FilmsResponseProps,
  ListProps,
  ListsResponseProps,
  UserListsProps,
  UserQueryProps,
} from '../types';
import { FilmObject } from '../types/films';
import { ListCoverObject } from '../types/lists';
import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from './config/constants';
import userListsScrapper from './lists/UserLists';
import listScrapper from './lists/listScrapper';

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
    `${MAIN_URL}/${username}/${LIST_TYPES.watchlist}/`;

  const allFilms: FilmObject[] = [];
  let triggeredError: string | null = null;

  while (currentUrl) {
    const { films, nextPageUrl, error } = await listScrapper({
      url: currentUrl,
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
};

/**
 * @summary Gets user lists
 * @description This function returns an array of objects with user's lists data.
 * @param {string} username - Letterboxd username
 * @param {object} options - OptionsProps
 * @returns {object}  FilmsResponseProps
 */

export const getUserLists = async ({
  username,
  options = {
    posters: true,
    summary: true,
    amount: true,
  },
}: UserListsProps): Promise<ListsResponseProps> => {
  if (!username) {
    return {
      status: QUERY_RESULT_STATUS.failed,
      data: [],
      errorMessage: ERROR_MESSAGES.missing_parameters,
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
    `${MAIN_URL}/${username}/${LIST_TYPES.lists}/`;

  const allLists: ListCoverObject[] = [];
  let triggeredError: string | null = null;

  while (currentUrl) {
    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: currentUrl,
      totalItems: allLists.length,
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
    status: QUERY_RESULT_STATUS.error,
    data: allLists,
    errorMessage: null,
  };
};

/**
 * @summary Gets user watchlist
 * @description This function returns an array of objects with user's watchlist films data.
 * @param {string} username - Letterboxd username
 * @param {object} options - OptionsProps
 * @returns {object}  FilmsResponseProps
 */

export const getListFilms = async ({
  url,
  options = {
    IMDBID: true,
    poster: true,
  },
}: ListProps): Promise<FilmsResponseProps> => {
  if (!url) {
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

  let currentUrl: string | null = url;

  const allFilms: FilmObject[] = [];
  let triggeredError: string | null = null;

  while (currentUrl) {
    const { films, nextPageUrl, error } = await listScrapper({
      url: currentUrl,
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
};
