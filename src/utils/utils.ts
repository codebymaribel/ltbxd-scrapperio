import nameToImdb from "name-to-imdb";

/**
 * @description Checks if a string is a valid Letterboxd URL
 * @param {String} url - Letterboxd URL
 * @returns {Promise}
 */
export const checkIfValidURL = (url: string) =>
  url.toLowerCase().includes("https://letterboxd.com");

export const measureFunctionTime = async (fn, args) => {
  console.time("Function execution time");
  const result = await fn(args);
  console.timeEnd("Function execution time");
  return result;
};

export async function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const searchIMDB = (title: string) => {
  return new Promise((resolve, reject) =>
    nameToImdb(title, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    }),
  )
    .then((imdbID) => imdbID)
    .catch(() => null);
};
