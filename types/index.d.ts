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

export type QueryResponseProps = {
  status: (typeof QUERY_RESULT_STATUS)[keyof typeof QUERY_RESULT_STATUS];
  data: FilmObject[] | ListCoverObject[] | [];
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
