import {
  ERROR_MESSAGES,
  CONTENT_TYPE,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from '../src/config/constants';
import { getWatchlist } from '../src/index';
import listScrapper from '../src/lists/listScrapper';

// Mock the listScrapper function
jest.mock('../src/lists/listScrapper', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      ({ url = `${MAIN_URL}/testuser/${CONTENT_TYPE.WATCHLIST}` }) => {
        //Simulate pagination
        if (url.includes('page2')) {
          return Promise.resolve({
            films: [
              {
                name: 'Film 3',
                id: 'tt3',
                poster: 'http://example.com/poster3.jpg',
              },
              {
                name: 'Film 4',
                id: 'tt4',
                poster: 'http://example.com/poster4.jpg',
              },
            ],
            nextPageUrl: null, // No more pages
            error: null,
          });
        } else {
          return Promise.resolve({
            films: [
              {
                name: 'Film 1',
                id: 'tt1',
                poster: 'http://example.com/poster1.jpg',
              },
              {
                name: 'Film 2',
                id: 'tt2',
                poster: 'http://example.com/poster2.jpg',
              },
            ],
            nextPageUrl: `${MAIN_URL}/testuser/watchlist/page2`, // Next page URL
            error: null,
          });
        }
      },
    ),
}));

describe('getWatchlist', () => {
  it('Should return a list of films based on a valid letterboxd username', async () => {
    const result = await getWatchlist({ username: 'testuser' });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data.length).toBe(4);
    expect(result.data[0].name).toBe('Film 1');
    expect(result.data[0].id).toBe('tt1');
    expect(result.data[0].poster).toBe('http://example.com/poster1.jpg');
  });

  it('Should handle error if username is not found', async () => {
    //@ts-expect-error typeError because theres no username found in getWatchlist parameters.
    const result = await getWatchlist({ options: { poster: false } });

    expect(result.status).toBe(QUERY_RESULT_STATUS.failed);
    expect(result.data.length).toBe(0);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.missing_parameters);
  });
});

describe('Checking options...', () => {
  it('Should add poster: true if poster is missing in options', async () => {
    const options = { IMDBID: false };

    const result = await getWatchlist({ username: 'testuser', options });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data.length).toBe(4);
    // Verify options_selected includes IMDBID: true
    expect(options).toEqual({ IMDBID: false, poster: true });
  });

  it('Should add IMDBID: true if IMDBID is missing in options', async () => {
    const options = { poster: false };
    const result = await getWatchlist({ username: 'testuser', options });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data.length).toBe(4);
    // Verify options_selected includes IMDBID: true
    expect(options).toEqual({ IMDBID: true, poster: false });
  });

  it('Should not modify options_selected if IMDBID and poster are already declared in options', async () => {
    const options = { poster: false, IMDBID: true, max: 10 };
    const result = await getWatchlist({ username: 'testuser', options });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data.length).toBe(4);

    expect(options).toEqual({ poster: false, IMDBID: true, max: 10 });
  });
});

describe('Checking errors...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should handle errors from listScrapper', async () => {
    // Override the mock to throw an error JUST for this test
    (listScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        films: [],
        nextPageUrl: null,
        error: ERROR_MESSAGES.scrapper_method_failed,
      }),
    );

    const result = await getWatchlist({ username: 'testuser' });

    expect(result.status).toBe(QUERY_RESULT_STATUS.error);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.scrapper_method_failed);
    expect(result.data.length).toBe(0);
  });
});
