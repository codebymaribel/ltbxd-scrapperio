/**
 * Website main URL
 * @constant
 */
export const MAIN_URL = 'https://letterboxd.com';

/**
 * Type of lists Object
 * @constant
 */

export const CONTENT_TYPE = {
  WATCHLIST: 'watchlist',
  FILMS: 'films',
  LIST: 'list',
  LISTS: 'lists',
  SEARCH: 'search'
} as const;

export const QUERY_RESULT_STATUS = {
  ok: 'OK',
  failed: 'FAILED',
  pending: 'PENDING',
  not_found: '404',
  error: 'ERROR',
} as const;

export const SCRAPPER_ERRORS = {
  missing_html_content : 'NO HTML CONTENT FOUND'
} as const;

export const ERROR_MESSAGES = {
  missing_parameters: 'INCOMPLETE PARAMETERS',
  not_valid_url: 'YOU NEED TO SUBMIT A VALID LETTERBOXD URL',
  try_catch_failed: 'THERE WAS A SYSTEM ERROR PROCESSING THE REQUEST',
  page_not_found: 'PAGE NOT FOUND',
  scrapper_method_failed: 'SCRAPPER METHOD FAILED',
} as const;

export const PROJECT_MANAGER_MESSAGES = {
  terms_not_acknowledged: 'Portfolio demo terms not acknowledged. See console for details.',
} as const;
