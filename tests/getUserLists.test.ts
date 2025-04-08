import { getUserLists } from '../src';
import {
  ERROR_MESSAGES,
  LIST_TYPES,
  MAIN_URL,
  QUERY_RESULT_STATUS,
} from '../src/config/constants';
import userListsScrapper from '../src/lists/UserLists';

// Mock the listScrapper function
jest.mock('../src/lists/UserLists', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      ({ url = `${MAIN_URL}/testuser/${LIST_TYPES.lists}/` }) => {
        //Simulate pagination
        if (url.includes('page2')) {
          return Promise.resolve({
            lists: [
              {
                title: 'Country stories',
                summary: null,
                amount: '2 films',
                url: 'https://letterboxd.com/maribelbhf/list/country-stories/',
                posters: [
                  'https://a.ltrbxd.com/resized/film-poster/4/6/0/8/3/0/460830-portrait-of-a-lady-on-fire-0-70-0-105-crop.jpg?v=79b0f67aa9',
                  'https://a.ltrbxd.com/resized/film-poster/1/1/4/5/7/6/114576-blue-is-the-warmest-color-0-70-0-105-crop.jpg?v=039edf9ea6',
                ],
              },
            ],
            nextPageUrl: null, // No more pages
            error: null,
          });
        } else {
          return Promise.resolve({
            lists: [
              {
                title: 'Peliculitas para asustarnos de manera uteana v1.0',
                summary: 'This is the summary',
                amount: '27 films',
                url: 'https://letterboxd.com/maribelbhf/list/peliculitas-para-asustarnos-de-manera-uteana/',
                posters: [
                  'https://a.ltrbxd.com/resized/film-poster/4/2/7/7/9/42779-coraline-0-70-0-105-crop.jpg?v=b792483e2a',
                  'https://a.ltrbxd.com/resized/film-poster/5/0/1/5/8/50158-sleepy-hollow-0-70-0-105-crop.jpg?v=2b0876af9c',
                  'https://a.ltrbxd.com/resized/film-poster/7/9/3/8/8/3/793883-smile-0-70-0-105-crop.jpg?v=54791d7575',
                  'https://a.ltrbxd.com/resized/film-poster/6/4/2/2/4/9/642249-tarot-0-70-0-105-crop.jpg?v=5cc2d7ccfa',
                  'https://a.ltrbxd.com/resized/film-poster/6/6/6/3/9/6/666396-when-evil-lurks-0-70-0-105-crop.jpg?v=cf13e1893c',
                ],
              },
              {
                title: 'Si me pides que elija una pelicula sería una de estas',
                summary: null,
                amount: '80 films',
                url: 'https://letterboxd.com/maribelbhf/list/si-me-pides-que-elija-una-pelicula-seria/',
                posters: [
                  'https://a.ltrbxd.com/resized/sm/upload/um/45/8m/or/t0c3qxcKSaO4iBYVAzIeyPbC8I1-0-70-0-105-crop.jpg?v=72ab2e2ec7',
                  'https://a.ltrbxd.com/resized/film-poster/7/7/4/4/5/4/774454-crush-0-70-0-105-crop.jpg?v=fc5422620b',
                  'https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-70-0-105-crop.jpg?v=053670ff84',
                  'https://a.ltrbxd.com/resized/sm/upload/jn/np/vd/8h/qxUKbHFaqC0PYKITLERnt5fmuBg-0-70-0-105-crop.jpg?v=47f413d784',
                  'https://a.ltrbxd.com/resized/film-poster/5/1/9/7/0/51970-before-sunset-0-70-0-105-crop.jpg?v=059bc2bbc0',
                ],
              },
            ],
            nextPageUrl: `https://letterboxd.com/testuser/lists/page2`, // Next page URL
            error: null,
          });
        }
      },
    ),
}));

describe('getUserLists should return OK and lists populated in data', () => {
  it('Should return a list of lists based on a valid letterboxd username', async () => {
    const result = await getUserLists({ username: 'testuser' });

    expect(result.data.length).toBe(3);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.anything(),
          summary: expect.anything(),
          amount: expect.anything(),
          url: expect.anything(),
          posters: expect.anything(),
        }),
      ]),
    );
  });

  it('Should return 2 lists max', async () => {
    const result = await getUserLists({
      username: 'testuser',
      options: { max: 2 },
    });

    expect(result.data).toHaveLength(2);
  });
});

describe('Checking options...', () => {
  it('Should add options value if not specified in the options obj', async () => {
    const result = await getUserLists({
      username: 'testuser',
      options: { amount: false },
    });

    expect(result.data[0].posters).toStrictEqual([
      'https://a.ltrbxd.com/resized/film-poster/4/2/7/7/9/42779-coraline-0-70-0-105-crop.jpg?v=b792483e2a',
      'https://a.ltrbxd.com/resized/film-poster/5/0/1/5/8/50158-sleepy-hollow-0-70-0-105-crop.jpg?v=2b0876af9c',
      'https://a.ltrbxd.com/resized/film-poster/7/9/3/8/8/3/793883-smile-0-70-0-105-crop.jpg?v=54791d7575',
      'https://a.ltrbxd.com/resized/film-poster/6/4/2/2/4/9/642249-tarot-0-70-0-105-crop.jpg?v=5cc2d7ccfa',
      'https://a.ltrbxd.com/resized/film-poster/6/6/6/3/9/6/666396-when-evil-lurks-0-70-0-105-crop.jpg?v=cf13e1893c',
    ]);
  });

  it('Should add amount value if not specified in the options obj', async () => {
    const result = await getUserLists({
      username: 'testuser',
      options: { posters: false },
    });

    expect(result.data[0].amount).toStrictEqual('27 films');
  });
});

describe('Checking errors...', () => {
  it('Should handle error if username is not found', async () => {
    //@ts-expect-error typeError because theres no username found in getWatchlist parameters.
    const result = await getUserLists({ options: { amount: false } });

    expect(result.status).toBe(QUERY_RESULT_STATUS.failed);
    expect(result.data.length).toBe(0);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.missing_parameters);
  });

  it('Should handle errors from userListsScrapper', async () => {
    // Override the mock to throw an error JUST for this test
    (userListsScrapper as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        lists: [],
        nextPageUrl: null,
        error: ERROR_MESSAGES.scrapper_method_failed,
      }),
    );

    const result = await getUserLists({ username: 'testuser' });

    expect(result.status).toBe(QUERY_RESULT_STATUS.error);
    expect(result.errorMessage).toBe(ERROR_MESSAGES.scrapper_method_failed);
    expect(result.data.length).toBe(0);
  });
});
