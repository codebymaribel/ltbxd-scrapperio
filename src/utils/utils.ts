/**
 * @description Checks if a string is a valid Letterboxd URL
 * @param {String} url - Letterboxd URL
 * @returns {Promise}
 */
export const checkIfValidURL = (url: string) =>
    url.toLowerCase().includes('letterboxd.com');
  
  export const takeScreenshot = async ({ page }) =>
    await page.screenshot({
      path: 'screenshot.jpg',
    });
  
  export const measureFunctionTime = async (fn, args) => {
    console.time('Function execution time');
    const result = await fn(args);
    console.timeEnd('Function execution time');
    return result;
  };