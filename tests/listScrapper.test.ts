import { ERROR_MESSAGES, MAIN_URL } from '../src/config/constants';
import listScrapper from '../src/lists/listScrapper';
import scrapper from '../src/scrapper/scrapper';
import { searchIMDB } from '../src/utils/utils';

jest.mock('../src/scrapper/scrapper');
jest.mock('../src/utils/utils.ts');

const scrapper_response = true;
const dummyid = 'tt1231231';
const getPage_dummy = {
  content: `<div>
                  <li class="poster-container" data-owner-rating="0">
                    <div class="react-component poster film-poster film-poster-352504 linked-film-poster" data-component-class="globals.comps.FilmPosterComponent" data-film-id="352504" data-item-id="film:352504" data-film-name="Esteros" data-film-slug="esteros" data-poster-url="/film/esteros/image-150/" data-new-list-with-film-action="/list/new/with/esteros/" data-remove-from-watchlist-action="/film/esteros/remove-from-watchlist/" data-add-to-watchlist-action="/film/esteros/add-to-watchlist/" data-rate-action="/s/film:352504/rate/" data-film-link="/film/esteros/"><div><img src="https://a.ltrbxd.com/resized/film-poster/3/5/2/5/0/4/352504-esteros-0-125-0-187-crop.jpg?v=fe9b46b1c4" width="125" height="187" alt="Esteros" srcset="https://a.ltrbxd.com/resized/film-poster/3/5/2/5/0/4/352504-esteros-0-250-0-375-crop.jpg?v=fe9b46b1c4 2x" class="image"><a href="/film/esteros/" class="frame" data-original-title="Esteros (2016)"><span class="frame-title">Esteros (2016)</span><span class="overlay"></span></a></div></div>
                    </li>
                    <li class="poster-container" data-owner-rating="0">
                        <div class="react-component poster film-poster film-poster-26616 linked-film-poster" data-component-class="globals.comps.FilmPosterComponent" data-film-id="26616" data-item-id="film:26616" data-film-name="The White Ribbon" data-film-slug="the-white-ribbon" data-poster-url="/film/the-white-ribbon/image-150/" data-new-list-with-film-action="/list/new/with/the-white-ribbon/" data-remove-from-watchlist-action="/film/the-white-ribbon/remove-from-watchlist/" data-add-to-watchlist-action="/film/the-white-ribbon/add-to-watchlist/" data-rate-action="/s/film:26616/rate/" data-film-link="/film/the-white-ribbon/"><div><img src="https://a.ltrbxd.com/resized/film-poster/2/6/6/1/6/26616-the-white-ribbon-0-125-0-187-crop.jpg?v=4f4172dea5" width="125" height="187" alt="The White Ribbon" srcset="https://a.ltrbxd.com/resized/film-poster/2/6/6/1/6/26616-the-white-ribbon-0-250-0-375-crop.jpg?v=4f4172dea5 2x" class="image"><a href="/film/the-white-ribbon/" class="frame" data-original-title="The White Ribbon (2009)"><span class="frame-title">The White Ribbon (2009)</span><span class="overlay"></span></a></div></div>
                    </li>
                    <li class="poster-container" data-owner-rating="0">
                     <div class="react-component poster film-poster film-poster-985816 linked-film-poster" data-component-class="globals.comps.FilmPosterComponent" data-film-id="985816" data-item-id="film:985816" data-film-name="Daisy Jones &amp; the Six" data-film-slug="daisy-jones-the-six" data-poster-url="/film/daisy-jones-the-six/image-150/" data-new-list-with-film-action="/list/new/with/daisy-jones-the-six/" data-remove-from-watchlist-action="/film/daisy-jones-the-six/remove-from-watchlist/" data-add-to-watchlist-action="/film/daisy-jones-the-six/add-to-watchlist/" data-rate-action="/s/film:985816/rate/" data-film-link="/film/daisy-jones-the-six/"><div><img src="https://a.ltrbxd.com/resized/film-poster/9/8/5/8/1/6/985816-daisy-jones-the-six-0-125-0-187-crop.jpg?v=9b445c7209" width="125" height="187" alt="Daisy Jones &amp; the Six" srcset="https://a.ltrbxd.com/resized/film-poster/9/8/5/8/1/6/985816-daisy-jones-the-six-0-250-0-375-crop.jpg?v=9b445c7209 2x" class="image"><a href="/film/daisy-jones-the-six/" class="frame" data-original-title="Daisy Jones &amp; the Six (2023)"><span class="frame-title">Daisy Jones &amp; the Six (2023)</span><span class="overlay"></span></a></div></div>
                     </li>
                     <a class="next" href="/page2"></a>
                 </div>`,
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

    const { films, nextPageUrl, error } = await listScrapper({
      url: 'testURL',
      options,
    });

    expect(films).toHaveLength(3);
    expect(nextPageUrl).toBe(MAIN_URL + '/page2');
    expect(error).toBeNull();
  });

  it('Should return films array populated with nextPageUrl & error null', async () => {
    const getPage_withoutnext = {
      content: `<div>
                        <li class="poster-container" data-owner-rating="0">
                          <div class="react-component poster film-poster film-poster-352504 linked-film-poster" data-component-class="globals.comps.FilmPosterComponent" data-film-id="352504" data-item-id="film:352504" data-film-name="Esteros" data-film-slug="esteros" data-poster-url="/film/esteros/image-150/" data-new-list-with-film-action="/list/new/with/esteros/" data-remove-from-watchlist-action="/film/esteros/remove-from-watchlist/" data-add-to-watchlist-action="/film/esteros/add-to-watchlist/" data-rate-action="/s/film:352504/rate/" data-film-link="/film/esteros/"><div><img src="https://a.ltrbxd.com/resized/film-poster/3/5/2/5/0/4/352504-esteros-0-125-0-187-crop.jpg?v=fe9b46b1c4" width="125" height="187" alt="Esteros" srcset="https://a.ltrbxd.com/resized/film-poster/3/5/2/5/0/4/352504-esteros-0-250-0-375-crop.jpg?v=fe9b46b1c4 2x" class="image"><a href="/film/esteros/" class="frame" data-original-title="Esteros (2016)"><span class="frame-title">Esteros (2016)</span><span class="overlay"></span></a></div></div>
                          </li>
                          <li class="poster-container" data-owner-rating="0">
                              <div class="react-component poster film-poster film-poster-26616 linked-film-poster" data-component-class="globals.comps.FilmPosterComponent" data-film-id="26616" data-item-id="film:26616" data-film-name="The White Ribbon" data-film-slug="the-white-ribbon" data-poster-url="/film/the-white-ribbon/image-150/" data-new-list-with-film-action="/list/new/with/the-white-ribbon/" data-remove-from-watchlist-action="/film/the-white-ribbon/remove-from-watchlist/" data-add-to-watchlist-action="/film/the-white-ribbon/add-to-watchlist/" data-rate-action="/s/film:26616/rate/" data-film-link="/film/the-white-ribbon/"><div><img src="https://a.ltrbxd.com/resized/film-poster/2/6/6/1/6/26616-the-white-ribbon-0-125-0-187-crop.jpg?v=4f4172dea5" width="125" height="187" alt="The White Ribbon" srcset="https://a.ltrbxd.com/resized/film-poster/2/6/6/1/6/26616-the-white-ribbon-0-250-0-375-crop.jpg?v=4f4172dea5 2x" class="image"><a href="/film/the-white-ribbon/" class="frame" data-original-title="The White Ribbon (2009)"><span class="frame-title">The White Ribbon (2009)</span><span class="overlay"></span></a></div></div>
                          </li>
                          <li class="poster-container" data-owner-rating="0">
                           <div class="react-component poster film-poster film-poster-985816 linked-film-poster" data-component-class="globals.comps.FilmPosterComponent" data-film-id="985816" data-item-id="film:985816" data-film-name="Daisy Jones &amp; the Six" data-film-slug="daisy-jones-the-six" data-poster-url="/film/daisy-jones-the-six/image-150/" data-new-list-with-film-action="/list/new/with/daisy-jones-the-six/" data-remove-from-watchlist-action="/film/daisy-jones-the-six/remove-from-watchlist/" data-add-to-watchlist-action="/film/daisy-jones-the-six/add-to-watchlist/" data-rate-action="/s/film:985816/rate/" data-film-link="/film/daisy-jones-the-six/"><div><img src="https://a.ltrbxd.com/resized/film-poster/9/8/5/8/1/6/985816-daisy-jones-the-six-0-125-0-187-crop.jpg?v=9b445c7209" width="125" height="187" alt="Daisy Jones &amp; the Six" srcset="https://a.ltrbxd.com/resized/film-poster/9/8/5/8/1/6/985816-daisy-jones-the-six-0-250-0-375-crop.jpg?v=9b445c7209 2x" class="image"><a href="/film/daisy-jones-the-six/" class="frame" data-original-title="Daisy Jones &amp; the Six (2023)"><span class="frame-title">Daisy Jones &amp; the Six (2023)</span><span class="overlay"></span></a></div></div>
                           </li>
                       </div>`,
      errorMessage: ERROR_MESSAGES.not_valid_url,
    };
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_withoutnext);
    const { films, nextPageUrl, error } = await listScrapper({
      url: 'testURL',
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

    const { films, nextPageUrl, error } = await listScrapper({
      url: 'testURL',
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

    const { films, nextPageUrl, error } = await listScrapper({
      url: 'testURL',
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

    const { films, nextPageUrl, error } = await listScrapper({
      url: 'testURL',
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

    const { films, nextPageUrl, error } = await listScrapper({
      url: 'testURL',
      options,
    });

    expect(films).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBe(ERROR_MESSAGES.scrapper_method_failed);
  });
});
