import { QUERY_RESULT_STATUS } from "../config/constants";

export type OptionsProps = {
  poster?: boolean;
  IMDBID?: boolean;
};
export interface UserQueryProps {
  username: string;
  options?: OptionsProps;
}

export type QueryResponseProps = {
  status: (typeof QUERY_RESULT_STATUS)[keyof typeof QUERY_RESULT_STATUS];
  data: [];
  errorMessage: string | null;
};
