import nameToImdb from 'name-to-imdb';
import { MAIN_URL } from '../config/constants';

/**
 * @description Checks if a string is a valid Letterboxd URL
 * @param {String} url - Letterboxd URL
 * @returns {Promise}
 */
export const checkIfValidURL = (url: string): boolean =>
  url.toLowerCase().includes(MAIN_URL);

export async function timeout(ms: number): Promise<boolean> {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

export const searchIMDB = async (title: string): Promise<string | null> => {
  return new Promise((resolve) =>
    nameToImdb(title, (err, res) => {
      if (err) resolve(null);
      else resolve(res);
    }),
  );
};
