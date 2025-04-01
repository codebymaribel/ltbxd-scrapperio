import { full_list_html } from './watchlist_mock';

export const puppeteerPageOK = {
  goto: jest
    .fn()
    .mockResolvedValue({ status: () => 200, content: full_list_html }),
  evaluate: jest.fn().mockResolvedValue({}),
  browser: jest.fn().mockImplementation(() => {
    return {close: jest.fn().mockResolvedValue(true)};
  }),
  content: jest.fn().mockResolvedValue(full_list_html),
  waitForSelector: jest.fn().mockResolvedValue(true),
};

export const puppeteerPageNull = { newPage: jest.fn().mockResolvedValue(null) };

export const puppeteerGoToNull = {
  goto: jest.fn().mockResolvedValue({ status: () => 404, content: null }),
  evaluate: jest.fn().mockResolvedValue({}),
  browser: jest.fn().mockResolvedValue(null),
  close: jest.fn().mockResolvedValue(true),
  content: jest.fn().mockResolvedValue(full_list_html),
  waitForSelector: jest.fn().mockResolvedValue(false),
};

export const puppeteerBrowserOK = {
  newPage: jest.fn().mockResolvedValue(puppeteerPageOK),
  close: jest.fn().mockResolvedValue(true),
};

export const puppeteerBrowserNull = {
  newPage: jest.fn().mockResolvedValue(puppeteerPageNull),
  close: jest.fn().mockResolvedValue(null),
};

export const puppeteerPage404 = {
  newPage: jest.fn().mockResolvedValue(puppeteerGoToNull),
  close: jest.fn().mockResolvedValue(null),
};

export default {
  launch: jest.fn().mockResolvedValue(puppeteerBrowserOK),
};
