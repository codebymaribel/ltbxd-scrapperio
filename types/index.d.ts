import { QUERY_RESULT_STATUS } from '../config/constants';
import { FilmObject } from './films';
import { ListCoverObject } from './lists';

export type OptionsProps = {
  poster?: boolean;
  IMDBID?: boolean;
  max?: number;
};

export interface UserQueryProps {
  username: string;
  options?: OptionsProps;
}

export type FilmsResponseProps = {
  status: (typeof QUERY_RESULT_STATUS)[keyof typeof QUERY_RESULT_STATUS];
  data: FilmObject[] | [];
  errorMessage: string | null;
};

export type ListsResponseProps = {
  status: (typeof QUERY_RESULT_STATUS)[keyof typeof QUERY_RESULT_STATUS];
  data: ListCoverObject[] | [];
  errorMessage: string | null;
};

export type UserListsOptions = {
  posters?: boolean;
  summary?: boolean;
  amount?: boolean;
  max?: number;
};

export type UserListsProps = {
  username: string;
  options?: UserListsOptions;
};

export type ListProps = {
  url: string;
  options?: OptionsProps
}
