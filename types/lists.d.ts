import { OptionsProps } from '.';
import { FilmObject } from './films';

export type ListScrapperProps = {
  url: string;
  options?: OptionsProps;
};

export type ScrappedList = {
  films: FilmObject[] | [];
  nextPageUrl: string | null;
  error: string | null;
};

export type ScrappedLists = {
  lists: ListCoverObject[] | [];
  nextPageUrl: string | null;
  error: string | null;
};

export type ListCoverObject = {
  title: string;
  summary?: string | null;
  coverPosters?: string[] | null;
  url: string;
};
