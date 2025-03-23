import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from '../src/config/constants';
import { getWatchlist } from '../src/index';

// Mock the listScrapper function
jest.mock('../src/lists/listScrapper', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      ({ url = `${MAIN_URL}/testuser/${LIST_TYPES.watchlist}` }) => {
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

describe('getWatchlist options logic', () => {
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

describe('getWatchlist max films logic', () => {
  it('should stop scraping when allFilms.length reaches options.max', async () => {
    const options = { max: 2 }; // Stop after 3 films
    const result = await getWatchlist({ username: 'testuser', options });

    expect(result.status).toBe(QUERY_RESULT_STATUS.ok);
    expect(result.data.length).toBe(2); // Should stop after 3 films
    expect(result.data).toEqual([
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
    ]);
  });
});
