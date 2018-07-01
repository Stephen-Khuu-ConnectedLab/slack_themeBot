
jest.mock('../../app/db/mongo_resolvers');

describe('mongo util', () => {
  let findAllThemesMock = jest.fn();
  let findThemeMock = jest.fn();
  let saveThemeMock = jest.fn();
  let collectionMock = jest.fn();
  let db;

  beforeEach(() => {
    require('../../app/db/mongo_resolvers').findAllThemes = findAllThemesMock;
    require('../../app/db/mongo_resolvers').findTheme = findThemeMock;
    require('../../app/db/mongo_resolvers').saveTheme = saveThemeMock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  }); 

  describe('list theme', () => {
    test('will call mongo db to find all themes', () => {
      db = {
        'collection' : collectionMock
      };
      const mongoUtil = require('../../app/db/mongo_util');

      mongoUtil(db, 'list', '', {}, {});
      let callback = collectionMock.mock.calls[0][1];
      callback({}, {});

      expect(collectionMock).toHaveBeenCalledWith('theme-bot-api', expect.any(Function)); 
      expect(findAllThemesMock).toHaveBeenCalled();
    }); 
  });

  describe('get theme', () => {
    test('will call mongo db to find theme name', () => {
      let findOneMock = jest.fn();
      db = {
        'collection' : jest.fn(() => {
          return {
            'findOne' : findOneMock
          }
        })
      };
      const mongoUtil = require('../../app/db/mongo_util');

      mongoUtil(db, 'get a_theme_name', '', {}, {});
      let callback = findOneMock.mock.calls[0][1];
      callback({}, {});

      expect(findOneMock).toHaveBeenCalledWith({
        'name' : 'a_theme_name'
      }, expect.any(Function)); 
      expect(findThemeMock).toHaveBeenCalled();
    });
  });

  describe('save theme', () => {
    test('will call mongo db to save a theme', () => {
      let updateMock = jest.fn();
      db = {
        'collection' : jest.fn(() => {
          return {
            'update' : updateMock
          }
        })
      };
      const mongoUtil = require('../../app/db/mongo_util');
      
      mongoUtil(db, 'save a_theme_name', ['#111', '#222', '#333'], {}, {});
      let callback = updateMock.mock.calls[0][3];
      callback({}, {});

      expect(updateMock).toHaveBeenCalledWith({
        'name' : 'a_theme_name'
      }, {
        'name': 'a_theme_name', 
        'theme_colors': '#111,#222,#333'
      }, {
        upsert: true
      }, expect.any(Function)); 
      expect(saveThemeMock).toHaveBeenCalled();
    });
  });

  test('will do nothing if command does not exist', () => {
    const mongoUtil = require('../../app/db/mongo_util');

    mongoUtil(db, 'not_a_valid_command a_theme_name', ['#111', '#222', '#333'], {}, {});

    expect(collectionMock).not.toHaveBeenCalled();
    expect(findAllThemesMock).not.toHaveBeenCalled();
    expect(findThemeMock).not.toHaveBeenCalled();
    expect(saveThemeMock).not.toHaveBeenCalled();
  });
});