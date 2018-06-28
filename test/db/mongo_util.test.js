const mongoUtil = require('../../app/db/mongo_util');

describe('mongo util', () => {
  describe('get theme', () => {
    test('will call mongo db to find theme name', () => {
      let findMock = jest.fn();

      let collectionMock = jest.fn(() => {
        return {
          'findOne' : findMock
        };
      });

      let dbMock = {
        'collection' : collectionMock
      }

      mongoUtil(dbMock).getTheme('theme_name');

      expect(findMock.mock.calls[0][0]).toEqual({"name": "theme_name"});
    });

    //TODO: trigger call
  });

  describe('set theme', () => {
    test('will call mongo db to set a theme', () => {
      let updateMock = jest.fn();

      let collectionMock = jest.fn(() => {
        return {
          'update' : updateMock
        };
      });

      let dbMock = {
        'collection' : collectionMock
      }

      mongoUtil(dbMock).setTheme('theme_name', '#111, #222, #333');

      expect(updateMock.mock.calls[0][1]).toEqual({
        "name": "theme_name",
        "theme_colors" : "#111, #222, #333"
      });
    });
  });
});