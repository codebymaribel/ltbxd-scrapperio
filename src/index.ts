import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from './config/constants';
import { listScrapper } from './lists/lists';
import { QueryResponseProps, UserQueryProps } from '../types';
import { FilmObject } from '../types/films';

/**
 * @summary Gets user watchlist
 * @description This function returns an array of objects with user's watchlist films data.
 * @param {string} username - Letterboxd username
 * @param {object} options - Query {@link https://github.com/codebymaribel/ltbxd-scrapper?tab=readme-ov-file#options-object| Options Object}
 * @returns {object}  {@link https://github.com/codebymaribel/ltbxd-scrapper?tab=readme-ov-file#film-object | Film Object[]} in the data param of the {@link https://github.com/codebymaribel/ltbxd-scrapper?tab=readme-ov-file#options-object | QueryResponseProps}
 */

export const getWatchlist = async ({
  username,
  options = {
    poster: false,
    IMDBID: false,
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