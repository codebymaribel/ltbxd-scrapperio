import { MAIN_URL } from '../src/config/constants';
import { checkIfValidURL, searchIMDB, timeout } from '../src/utils/utils';

jest.mock('name-to-imdb');

describe('checkIfValidURL', () => {
  it('Should return true if string includes MAIN_URL', () => {
    const test = checkIfValidURL(MAIN_URL + '/list/test', 'list');

    expect(test).toBeTruthy();
  });

  it('Should return false if string doesnt include MAIN_URL', () => {
    const test = checkIfValidURL('/test', 'list');

    expect(test).toBeFalsy();
  });
});

describe('timeout', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock all timers
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers(); // Restore real timers
  });

  it('should resolve after specified milliseconds', async () => {
    const ms = 200;
    const promise = timeout(ms);

    jest.advanceTimersByTime(ms); // Fast-forward time

    await expect(promise).resolves.toBe(true);
  });
});

describe('searchIMDB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return film ID based on name', async () => {
    const test = await searchIMDB('Mocked Movie');

    expect(test).toBe('tt1234567');
  });

  it('Should return null on error case', async () => {
    const test = await searchIMDB('Error');

    expect(test).toBeNull();
  });
});
