import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from "./config/constants";
import { listScrapper } from "./lists/lists";
import { QueryResponseProps, UserQueryProps } from "./types";
import { FilmArrayProps } from "./types/films";

export const getWatchlist = async ({
  username,
  options = {
    poster: false,
    IMDBID: false,
  },
}: UserQueryProps) => {
  if (!username) {
    return {
      status: QUERY_RESULT_STATUS.failed,
      data: [],
      errorMessage: ERROR_MESSAGES.missing_parameters,
    } as QueryResponseProps;
  }

  let currentUrl: string | null =
    `${MAIN_URL}/${username}/${LIST_TYPES.watchlist}/`;

  const allFilms: FilmArrayProps[] = [];

  while (currentUrl) {
    const { films, nextPageUrl } = await listScrapper({
      url: currentUrl,
      options,
    });
    allFilms.push(...films);
    currentUrl = nextPageUrl;
  }
  console.log(allFilms[allFilms.length - 1]);

  return {
    status: QUERY_RESULT_STATUS.ok,
    data: allFilms,
    errorMessage: null,
  };
};

getWatchlist({
  username: "maribelbhf",
  options: {
    IMDBID: true,
  },
});
