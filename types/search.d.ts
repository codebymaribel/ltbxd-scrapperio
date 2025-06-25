import { FilmObject, FilmSearchObject } from './films';
import { PageContentType } from './lists';

export type SearchOptions = {
  poster?: boolean;
  alternativeTitles?: boolean;
  director?: boolean;
  max?: number;
};

export type SearchScrapperProps = {
  url: string;
  options: SearchOptions;
  contentType: PageContentType
};

export type ScrappedSearch = {
  films: FilmSearchObject[] | [];
  nextPageUrl: string | null;
  error: string | null;
};
