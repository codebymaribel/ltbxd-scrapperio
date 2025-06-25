import { getListFilms } from '../src';
import {
  ERROR_MESSAGES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from '../src/config/constants';
import listScrapper from '../src/lists/listScrapper';

jest.mock('../src/lists/listScrapper');

describe('getListFilms should return OK and films populated in data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return a list of lists based on a valid letterboxd url', async () => {
    (listScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        films: [
          {
            title: 'Film 1',
            id: 'tt123123',
            slug: 'film1',
            poster: 'http://example.com/poster1.jpg',
          },
        ],
        nextPageUrl: null,
        error: null,
      }),
    );
    const result = await getListFilms({
      url: `${MAIN_URL}/testuser/list/test-list`,
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data).toHaveLength(1);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.stringMatching('Film 1'),
          id: expect.stringMatching('tt123123'),
          slug: expect.stringMatching('film1'),
          poster: expect.stringMatching('http://example.com/poster1.jpg'),
        }),
      ]),
    );
  });

  it('Should return 2 lists max', async () => {
    (listScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        films: [
          {
            title: 'Film 1',
            id: 'tt123123',
            slug: 'film1',
            poster: 'http://example.com/poster1.jpg',
          },
          {
            title: 'Film 2',
            id: 'tt123122',
            slug: 'film2',
            poster: 'http://example.com/poster1.jpg',
          },
        ],
        nextPageUrl: null,
        error: null,
      }),
    );
    const result = await getListFilms({
      url: `${MAIN_URL}/testuser/list/test-list`,
      options: { max: 2 },
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data).toHaveLength(2);
    expect(result.errorMessage).toBeNull();
  });
});

describe('Checking options...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return id null and poster populated', async () => {
    (listScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        films: [
          {
            title: 'Film 1',
            id: null,
            slug: 'film1',
            poster: 'http://example.com/poster1.jpg',
          },
        ],
        nextPageUrl: null,
        error: null,
      }),
    );

    const result = await getListFilms({
      url: `${MAIN_URL}/testuser/list/test-list`,
      options: { IMDBID: false },
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data).toHaveLength(1);
    expect(result.errorMessage).toBeNull();

    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          poster: expect.anything(),
          id: null,
        }),
      ]),
    );
  });

  it('Should return poster null and id populated', async () => {
    (listScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        films: [
          {
            title: 'Film 1',
            id: 'ttt232',
            slug: 'film1',
            poster: null,
          },
        ],
        nextPageUrl: null,
        error: null,
      }),
    );

    const result = await getListFilms({
      url: `${MAIN_URL}/testuser/list/test-list`,
      options: { IMDBID: false },
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data).toHaveLength(1);
    expect(result.errorMessage).toBeNull();

    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.anything(),
          poster: null,
        }),
      ]),
    );
  });
});

describe('Checking errors...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should return missing parameters if url is not sent', async () => {
    //@ts-expect-error username is not passed to getListFilms
    const result = await getListFilms({
      options: { IMDBID: false },
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.failed);
    expect(result.data).toHaveLength(0);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.missing_parameters);
  });

  it('Should return error from listScrapper', async () => {
    (listScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        films: [],
        nextPageUrl: null,
        error: ERROR_MESSAGES.scrapper_method_failed,
      }),
    );
    const result = await getListFilms({
      url: `${MAIN_URL}/testuser/list/test-list`,
      options: { IMDBID: false },
    });

    expect(result.status).toBe(QUERY_RESULT_STATUS.error);
    expect(result.data).toHaveLength(0);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.scrapper_method_failed);
  });
});
