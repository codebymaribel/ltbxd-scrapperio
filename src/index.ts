import { QueryResponseProps, UserQueryProps } from '../types';
import { FilmObject } from '../types/films';
import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from './config/constants';
import { listScrapper } from './lists/lists';

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
    poster: true,
    IMDBID: true,
  },
}: UserQueryProps): Promise<QueryResponseProps> => {
  if (!username) {
    return {
      status: QUERY_RESULT_STATUS.failed,
      data: [],
      errorMessage: ERROR_MESSAGES.missing_parameters,
    };
  }

  let currentUrl: string | null =
    `${MAIN_URL}/${username}/${LIST_TYPES.watchlist}/`;

  const allFilms: FilmObject[] = [];

  while (currentUrl) {
    const { films, nextPageUrl } = await listScrapper({
      url: currentUrl,
      options,
    });
    allFilms.push(...films);
    currentUrl = nextPageUrl;
  }

  return {
    status: QUERY_RESULT_STATUS.ok,
    data: allFilms,
    errorMessage: null,
  };
};
