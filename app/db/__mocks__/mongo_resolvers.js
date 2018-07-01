const mongoResolver = jest.genMockFromModule('../mongo_resolvers');

mongoResolver.findAllThemes = jest.fn();
mongoResolver.findTheme = jest.fn();
mongoResolver.saveTheme = jest.fn();

module.exports = mongoResolver;