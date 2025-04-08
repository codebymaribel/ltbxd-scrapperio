import { OptionsProps, UserListsOptions } from '.';
import { FilmObject } from './films';

export type ListScrapperProps = {
  url: string;
  totalItems?: number;
  options?: OptionsProps;
};

export type UserListsProps = {
  url: string;
  totalItems?: number;
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
