import { ERROR_MESSAGES, MAIN_URL } from '../src/config/constants';
import { searchScrapper } from '../src/lists/searchScrapper';
import scrapper from '../src/scrapper/scrapper';
import { search_html, search_html_next } from './__mocks__/search_mocks';

jest.mock('../src/scrapper/scrapper');

const scrapper_response = true;
const getPage_dummy = {
  content: search_html,
  errorMessage: null,
};
const options = {
  poster: true,
  alternativeTitles: true,
  director: true,
};

//@ts-expect-error mockResolvedValue is not present on type and triggers ts error
scrapper.launchBrowser.mockResolvedValue(scrapper_response);

describe('searchScrapper should return OK and lists populated in data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return a list of lists based on a valid letterboxd list URL', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.launchBrowser.mockResolvedValue(scrapper_response);
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const url = `${MAIN_URL}/search/films/Harry+Potter/`;
    const { films, nextPageUrl, error } = await searchScrapper({
      url,
      contentType: 'search',
      options,
    });

    const firstFilm = films[0];

    expect(films).toHaveLength(4);
    expect(nextPageUrl).toBeNull();
    expect(error).toBeNull();
    expect(firstFilm).toEqual(
      expect.objectContaining({
        title: 'Harry Potter and the Prisoner of Azkaban',
        year: 2004,
        alternativeTitles: [
          'Hari Poter i zatvorenik iz Askabana',
          'Garri Potter i uznik Azkabana',
          'Khari Potŭr i zatvornikŭt ot Azkaban',
          'O Chári Póter kai o Aichmálotos tou Azkampán',
          'Hari Poter i Zatvorenikot od Azkaban',
          "Harri Potter i v'yazenʹ Azkabanu",
          'Harry Potter A Vezen Zazkabanu',
          'Harry Potter Eo Prisoneiro de Azkaban',
          '해리 포터 3',
          'Harry Potter e o Prisioneiro de Azkaban',
          '해리포터와 아즈카반의 죄수',
          'Harijs Poters un Azkabanas gūsteknis',
          'Гарри Поттер и узник Азкабана',
          'ハリー・ポッターとアズカバンの囚人',
          'ハリーポッターとアズカバンの囚人',
          'הרי פותר והאסיר מאזקבאן',
          "Harry Potter et le Prisonnier d'Azkaban",
          'Harry Potter ja Azkabani vang',
          '哈利·波特与阿兹卡班的囚徒',
          'แฮร์รี่ พอตเตอร์กับนักโทษแห่งอัซคาบัน',
          'Harry Potter và Tên Tù Nhân Ngục Azkaban',
          'هاري بوتر وسجين أزكابان',
          "Harry Potter (3) et le Prisonnier d'Azkaban",
          'Harry Potter III: Harry Potter and the Prisoner of Azkaban',
          'Harry Potter und der Gefangene von Askaban',
          'Հարրի Փոթերը և Ազկաբանի Բանտարկյալը',
          'Harry Potter e il prigioniero di Azkaban',
          'Harry Potter en de Gevangene van Azkaban',
          'Harry Potter és az Azkabani fogoly',
          'Harry Potter a Väzeň z Azkabanu',
          'Harry Potter och fången från Azkaban',
          'Harry Potter a vězeň z Azkabanu',
          'Harry Potter ve Azkaban Tutsağı',
          'Harry Potter y el prisionero de Azkaban',
          'Harry Potter ja Azkabanin vanki',
          'Ο Χάρι Πότερ και ο Αιχμάλωτος του Αζκαμπάν',
          'Harry Potter og fangen fra Azkaban',
          'Harry Potter i więzień Azkabanu',
          'แฮร์รี่ พอตเตอร์ กับ นักโทษแห่งอัซคาบัน',
          'הארי פוטר והאסיר מאזקבאן',
          'Хари Потер и затвореник из Аскабана',
          '해리 포터와 아즈카반의 죄수',
          'Harry Potter și prizonierul din Azkaban',
          "Harry Potter i el pres d'Azkaban",
          'Гаррі Поттер і в’язень Азкабану',
          '哈利波特：阿茲卡班的逃犯',
          "Harry Potter et le prisonnier d'Azkaban",
          'Хари Потър и затворникът от Азкабан',
          'Harry Potter và Tù Nhân Azkaban',
          'هری پاتر و زندانی آزکابان',
          'Haris Poteris ir Azkabano kalinys',
          'Harry Potter e o preso de Azkaban',
          'Harry Potter og fanginn frá Azkaban',
          'Harry Potter in jetnik iz Azkabana',
          'Harry Potter i Zatočenik Azkabana',
          'Хари Потер и Затвореникот од Азкабан',
          'ჰარი პოტერი და აზკაბანის ტყვე',
          'Harry Potter eta Azkabango Presoa',
          'هاري بوتر و سجين أزكابان',
          'हैरी पौटर और अस्काबान का कैदी  × Alternative titles: Hari Poter i zatvorenik iz Askabana',
          'Garri Potter i uznik Azkabana',
          'Khari Potŭr i zatvornikŭt ot Azkaban',
          'O Chári Póter kai o Aichmálotos tou Azkampán',
          'Hari Poter i Zatvorenikot od Azkaban',
          '…more',
        ],
        poster:
          'https://a.ltrbxd.com/resized/sm/upload/a3/0q/kf/h8/jUFjMoLh8T2CWzHUSjKCojI5SHu-0-70-0-105-crop.jpg?v=6285ee260e',
        director: 'Alfonso Cuarón',
      }),
    );
  });

  it('Should return a list of lists with next page url', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.launchBrowser.mockResolvedValue(scrapper_response);
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue({
      content: search_html_next,
      errorMessage: null,
    });

    const url = `${MAIN_URL}/search/films/Harry+Potter/`;
    const { films, nextPageUrl, error } = await searchScrapper({
      url,
      contentType: 'search',
      options,
    });

    expect(films).toHaveLength(1);
    expect(nextPageUrl).toBe(`${MAIN_URL}/page2`);
    expect(error).toBeNull();
  });
});

describe('Checking options...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return films array with poster as null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const options = {
      poster: false,
      alternativeTitles: true,
      director: true,
    };

    const { films, nextPageUrl, error } = await searchScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films[0].poster).toBeNull();
    expect(nextPageUrl).toBeNull();
    expect(error).toBeNull();
  });

  it('Should return films array with alternative titles as empty array', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const options = {
      poster: true,
      alternativeTitles: false,
      director: true,
    };

    const { films, nextPageUrl, error } = await searchScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films[0].alternativeTitles).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBeNull();
  });

  it('Should return films array with director as null', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const options = {
      poster: true,
      alternativeTitles: true,
      director: false,
    };

    const { films, nextPageUrl, error } = await searchScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films[0].director).toBeNull();
    expect(nextPageUrl).toBeNull();
    expect(error).toBeNull();
  });
  it('Should return films array with 2 max', async () => {
    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_dummy);

    const options = {
      poster: true,
      alternativeTitles: true,
      director: false,
      max: 2,
    };

    const { films, nextPageUrl, error } = await searchScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films).toHaveLength(2);
    expect(nextPageUrl).toBeNull();
    expect(error).toBeNull();
  });
});

describe('Checking errors...', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should trigger an error on scrapper.getPageContent and return empty films[], nextPageUrl as null and an error message', async () => {
    const getPage_content = {
      content: null,
      errorMessage: ERROR_MESSAGES.not_valid_url,
    };

    //@ts-expect-error mockResolvedValue is not present on type and triggers ts error
    scrapper.getPageContent.mockResolvedValue(getPage_content);

    const { films, nextPageUrl, error } = await searchScrapper({
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

    const { films, nextPageUrl, error } = await searchScrapper({
      url: 'testURL',
      contentType: 'list',
      options,
    });

    expect(films).toHaveLength(0);
    expect(nextPageUrl).toBeNull();
    expect(error).toBe(ERROR_MESSAGES.scrapper_method_failed);
  });
});
