import { ERROR_MESSAGES, MAIN_URL } from '../src/config/constants';
import userListsScrapper from '../src/lists/UserLists';
import scrapper from '../src/scrapper/scrapper';
import { lists_html, lists_html_wo_next } from './__mocks__/lists_mocks';

jest.mock('../src/scrapper/scrapper');

const scrapper_response = true;
const getPage_dummy = {
  content: lists_html,
  errorMessage: ERROR_MESSAGES.not_valid_url,
};
const options = {
  posters: true,
  summary: true,
  amount: true,
};

//@ts-expect-error mockResolvedValue is not present on type and triggers ts error
scrapper.launchBrowser.mockResolvedValue(scrapper_response);

describe('userListsScrapper returns OK with lists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return lists array with next page URL', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options,
    });

    expect(lists).toHaveLength(5);
    expect(nextPageUrl).toBe(MAIN_URL + '/page2');
    expect(error).toBeNull();
  });

  it('Should return lists array a max of 2 lists', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options: {
        posters: true,
        summary: true,
        amount: true,
        max: 2,
      },
    });

    expect(lists).toHaveLength(2);
    expect(nextPageUrl).toBe(MAIN_URL + '/page2');
    expect(error).toBeNull();
  });

  it('Should return lists array without next page URL', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue({
      content: lists_html_wo_next,
      errorMessage: ERROR_MESSAGES.not_valid_url,
    });

    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options,
    });

    expect(lists).toHaveLength(5);
    expect(nextPageUrl).toBe(null);
    expect(error).toBeNull();
  });
});

describe('Checking options...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return lists array without posters', async () => {
    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options: {
        posters: false,
        summary: true,
        amount: true,
      },
    });

    expect(lists).toHaveLength(5);
    expect(lists).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          posters: expect.anything(),
        }),
      ]),
    );
    expect(nextPageUrl).toBe(null);
    expect(error).toBeNull();
  });

  it('Should return lists array without summary', async () => {
    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options: {
        posters: true,
        summary: false,
        amount: true,
      },
    });

    expect(lists).toHaveLength(5);
    expect(lists).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          summary: expect.anything(),
        }),
      ]),
    );
    expect(nextPageUrl).toBe(null);
    expect(error).toBeNull();
  });

  it('Should return lists array without amount', async () => {
    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options: {
        posters: true,
        summary: true,
        amount: false,
      },
    });

    expect(lists).toHaveLength(5);
    expect(lists).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          amount: expect.anything(),
        }),
      ]),
    );
    expect(nextPageUrl).toBe(null);
    expect(error).toBeNull();
  });
});

describe('Checking errors...', () => {
  it('Should trigger an error on scrapper.getPageContent and return empty lists[], nextPageUrl as null and an error message', async () => {
    const getPage_content = {
      content: null,
      errorMessage: ERROR_MESSAGES.not_valid_url,
    };

    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_content);

    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options,
    });

    expect(lists).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBe(ERROR_MESSAGES.not_valid_url);
  });
  it('Should return error on failed initBrowser', async () => {
    const scrapper_response = false;

    //@ts-ignore
    scrapper.launchBrowser.mockResolvedValue(scrapper_response);

    const { lists, nextPageUrl, error } = await userListsScrapper({
      url: 'testURL',
      contentType: 'lists',
      options,
    });

    expect(lists).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBe(ERROR_MESSAGES.scrapper_method_failed);
  });
});
