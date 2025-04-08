module.exports = {
  __esModule: true,
  default: jest.fn().mockImplementation((query, callback) => {
    // Default mock implementation
    if (query.includes('Error')) {
      callback(new Error('Movie not found'), null);
      return;
    }

    // Success case
    callback(null, 'tt1234567');
  }),
};
