import { OptionsProps, UserListsOptions } from '.';
import { FilmObject } from './films';

export type ListScrapperProps = {
  url: string;
  options?: OptionsProps;
};

export type UserListsProps = {
  url: string;
  options?: UserListsOptions;
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
  amount?: string | null;
  posters?: string[] | null;
  url: string;
};
