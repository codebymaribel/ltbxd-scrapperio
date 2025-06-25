import { ERROR_MESSAGES, QUERY_RESULT_STATUS } from '../src/config/constants';
import { searchFilm } from '../src/index';
import scrapper from '../src/scrapper/scrapper';
import { search_html } from './__mocks__/search_mocks';

jest.mock('../src/scrapper/scrapper');

const scrapper_response = true;
const getPage_dummy = {
  content: search_html,
  errorMessage: null,
};
//@ts-expect-error mockResolvedValue is not present on type and triggers ts error
scrapper.launchBrowser.mockResolvedValue(scrapper_response);
//@ts-expect-error mockResolvedValue is not present on type and triggers ts error
scrapper.getPageContent.mockResolvedValue(getPage_dummy);

describe('searchFilm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return a list of films populated without error', async () => {
    const { status, data, errorMessage } = await searchFilm({
      title: 'harry potter',
    });

    expect(status).toBe(QUERY_RESULT_STATUS.ok);
    expect(data).toHaveLength(4);
    expect(errorMessage).toBeNull();
  });
});
describe('Checking options...', () => {
  it('Should return films without posters', async () => {
    const { status, data, errorMessage } = await searchFilm({
      title: 'harry potter',
      options: {
        poster: false,
      },
    });

    expect(status).toBe(QUERY_RESULT_STATUS.ok);
    expect(errorMessage).toBeNull();
    expect(data[0].poster).toBeNull();
  });
  it('Should return films without alternative titles', async () => {
    const { status, data, errorMessage } = await searchFilm({
      title: 'harry potter',
      options: {
        alternativeTitles: false,
      },
    });

    expect(status).toBe(QUERY_RESULT_STATUS.ok);
    expect(errorMessage).toBeNull();
    expect(data[0].alternativeTitles).toHaveLength(0);
  });
  it('Should return films without director', async () => {
    const { status, data, errorMessage } = await searchFilm({
      title: 'harry potter',
      options: {
        director: false,
      },
    });

    expect(status).toBe(QUERY_RESULT_STATUS.ok);
    expect(errorMessage).toBeNull();
    expect(data[0].director).toBeNull();
  });

  it('Should return max 2 films', async () => {
    const { status, data, errorMessage } = await searchFilm({
      title: 'harry potter',
      options: {
        max: 2,
      },
    });

    expect(status).toBe(QUERY_RESULT_STATUS.ok);
    expect(errorMessage).toBeNull();
    expect(data).toHaveLength(2);
  });
});
describe('Checking errors...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should return missing parameters if url is not sent', async () => {
    //@ts-expect-error username is not passed to getListFilms
    const result = await searchFilm({
      options: { poster: false },
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.failed);
    expect(result.data).toHaveLength(0);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.missing_parameters);
  });

  it('Should return error from listScrapper', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.launchBrowser.mockResolvedValue(false);

    const { status, data, errorMessage } = await searchFilm({
      title: 'harry potter',
    });

    expect(status).toBe(QUERY_RESULT_STATUS.error);
    expect(data).toHaveLength(0);
    expect(errorMessage).toBe(ERROR_MESSAGES.scrapper_method_failed);
  });
});
