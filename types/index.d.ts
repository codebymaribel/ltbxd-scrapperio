import { QUERY_RESULT_STATUS } from "../config/constants";
import { FilmObject } from "./films";

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
  data: FilmObject[] | [];
  errorMessage: string | null;
};
