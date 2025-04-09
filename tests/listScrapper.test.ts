import { ERROR_MESSAGES, MAIN_URL } from '../src/config/constants';
import listScrapper from '../src/lists/listScrapper';
import scrapper from '../src/scrapper/scrapper';
import { searchIMDB } from '../src/utils/utils';
import {
  full_list_html,
  list_without_next_html,
} from './__mocks__/watchlist_mock';

jest.mock('../src/scrapper/scrapper');
jest.mock('../src/utils/utils.ts');

const scrapper_response = true;
const dummyid = 'tt1231231';
const getPage_dummy = {
  content: full_list_html,
  errorMessage: ERROR_MESSAGES.not_valid_url,
};

//@ts-expect-error mockResolvedValue is not present on type and triggers ts error
searchIMDB.mockResolvedValue(dummyid);

//@ts-expect-error mockResolvedValue is not present on type and triggers ts error
scrapper.launchBrowser.mockResolvedValue(scrapper_response);

describe('listScrapper test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const options = {
    IMDBID: true,
    poster: true,
  };

  it('Should return films array populated and nextPageUrl with error null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const { films, nextPageUrl, error } = await await listScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films).toHaveLength(3);
    expect(nextPageUrl).toBe(MAIN_URL + '/page2');
    expect(error).toBeNull();
  });

  it('Should return films array populated with nextPageUrl & error null', async () => {
    const getPage_withoutnext = {
      content: list_without_next_html,
      errorMessage: ERROR_MESSAGES.not_valid_url,
    };
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_withoutnext);
    const { films, nextPageUrl, error } = await await listScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films).toHaveLength(3);
    expect(nextPageUrl).toBeNull();
    expect(error).toBeNull();
  });
});

describe('listScrapper options logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return films array with ID null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const options = {
      IMDBID: false,
      poster: true,
    };

    const { films, nextPageUrl, error } = await await listScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films[0].id).toBeNull();
    expect(nextPageUrl).toBe(MAIN_URL + '/page2');
    expect(error).toBeNull();
  });

  it('Should return films array with poster as null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const options = {
      IMDBID: true,
      poster: false,
    };

    const { films, nextPageUrl, error } = await await listScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films[0].poster).toBeNull();
    expect(nextPageUrl).toBe(MAIN_URL + '/page2');
    expect(error).toBeNull();
  });
});

describe('listScrapper error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const options = {
    IMDBID: true,
    poster: true,
  };
  it('Should trigger an error on scrapper.getPageContent and return empty films[], nextPageUrl as null and an error message', async () => {
    const getPage_content = {
      content: null,
      errorMessage: ERROR_MESSAGES.not_valid_url,
    };

    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_content);

    const { films, nextPageUrl, error } = await await listScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBe(ERROR_MESSAGES.not_valid_url);
  });

  it('Should trigger an error on scrapper.launchBrowser and return empty films[], nextPageUrl as null and an error message', async () => {
    const scrapper_response = false;

    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.launchBrowser.mockResolvedValue(scrapper_response);

    const { films, nextPageUrl, error } = await await listScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBe(ERROR_MESSAGES.scrapper_method_failed);
  });
});
