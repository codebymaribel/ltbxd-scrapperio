import { QueryResponseProps, UserQueryProps } from '../types';
import { FilmObject } from '../types/films';
import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from './config/constants';
import listScrapper from './lists/listScrapper';

/**
 * @summary Gets user watchlist
 * @description This function returns an array of objects with user's watchlist films data.
 * @param {string} username - Letterboxd username
 * @param {object} options - OptionsProps
 * @returns {object}  QueryResponseProps
 */

export const getWatchlist = async ({
  username,
  options = {
    IMDBID: true,
    poster: true,
  },
}: UserQueryProps): Promise<QueryResponseProps> => {
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
    if (allFilms.length === options?.max || error) {
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
