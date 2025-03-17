import * as cheerio from "cheerio";
import { MAIN_URL } from "../config/constants";
import scrapper from "../scrapper/scrapper";
import { OptionsProps } from "../types";
import { FilmArrayProps } from "../types/films";
import { searchIMDB } from "../utils/utils";

type ListScrapperProps = {
  url: string;
  options?: OptionsProps;
};

export async function listScrapper({ url, options }: ListScrapperProps) {
  try {
    const initBrowser = await scrapper.launchBrowser();

    if (!initBrowser) {
      return { films: [], nextPageUrl: null };
    }

    const htmlContent = await scrapper.getPageContent(url);

    if (!htmlContent?.content) {
      return { films: [], nextPageUrl: null };
    }

    const $ = cheerio.load(htmlContent.content);
    const filmContainers = $("div.film-poster > div").get();

    const films: FilmArrayProps[] = [];

    for (const filmContainer of filmContainers) {
      let id: string | null;
      let poster: string | null;

      const $filmContainer = $(filmContainer);
      const fullname =
        $filmContainer.find("a").attr("data-original-title") || "";
      const name = fullname.split(" (")[0];
      const type = "movie";

      if (options?.IMDBID) {
        id = (await searchIMDB(name)) as string;
      } else {
        id = null;
      }

      if (options?.poster) {
        poster = $filmContainer.find("img").attr("src") || "";
      } else {
        poster = null;
      }
      films.push({ id, name, type, poster });
    }
    const nextPage = $("a.next").attr("href");

    if (!nextPage) {
      return { films, nextPageUrl: null };
    }
    const absoluteNextPageUrl = new URL(nextPage, MAIN_URL).href;

    return { films, nextPageUrl: absoluteNextPageUrl };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return { films: [], nextPageUrl: null };
  }
}
