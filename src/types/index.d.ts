import { QUERY_RESULT_STATUS } from "../config/constants";

export interface UserQueryProps {
  username: string;
  posters: boolean;
}

export type QueryResponseProps = {
    status: (typeof QUERY_RESULT_STATUS)[keyof typeof QUERY_RESULT_STATUS];
    data: [];
    errorMessage: string | null;
  };