const mongoResolvers = require('../../app/db/mongo_resolvers');

describe('mongo resolvers', () => {
  let jsonMock;
  let responseMock;

  beforeEach(() => {
    jsonMock = jest.fn();
    responseMock = {
      'json' : jsonMock
    };
  });

  describe('resolveDBResponse', () => {
    test('will return response with error when there is an error', () => {
      let responseData = {};

      mongoResolvers.resolveDBResponse('an error', {}, responseData, responseMock, {});

      expect(jsonMock).toHaveBeenCalledWith({
        'text': "",
        'attachments' : [
          {
            "color": "danger", 
            "mrkdwn_in": ["text"], 
            "text": "*Error*:\nA DB error has occured"
          }]
      });
    });

    test('will delegate response to callback when there are no errors', () => {
      let callbackMock = jest.fn();
      let dbData = {
        'some' : 'data'
      };
      let responseData = {};

      mongoResolvers.resolveDBResponse(undefined, dbData, responseData, responseMock, callbackMock);

      expect(callbackMock).toHaveBeenCalledWith(responseData, dbData);
      expect(jsonMock).toHaveBeenCalledWith(responseData);
    });
  });

  describe('findAllThemes', () => {
    let resolveDBResponseMock = jest.fn();

    beforeEach(() => {
      mongoResolvers.resolveDBResponse = resolveDBResponseMock;
    });
    
    test('will return response with error when there is an error', () => {      
      let responseData = {};

      mongoResolvers.findAllThemes('an error', {}, responseData, responseMock, {});

      expect(jsonMock).toHaveBeenCalledWith({
        'text': "",
        'attachments' : [
          {
            "color": "danger", 
            "mrkdwn_in": ["text"], 
            "text": "*Error*:\nA DB error has occured"
          }]
      });
    });

    test('will resolve collection of themes', () => {
      let toArrayMock = jest.fn();
      let findMock = jest.fn(() => {
        return {
          'toArray' : toArrayMock
        }
      });
      let collection = {
        'find' : findMock
      };
      let returnedItems = [{
        'name' : 'a_theme'
      }];
      let resolveSpy = jest.spyOn(mongoResolvers, 'resolveDBResponse');

      mongoResolvers.findAllThemes(undefined, collection, {}, responseMock);
      let toArrayCallback = toArrayMock.mock.calls[0][0];
      toArrayCallback(undefined, returnedItems);
      
      expect(resolveSpy).toHaveBeenCalledWith(undefined, returnedItems, {}, responseMock, expect.any(Function));
    });

    test('will list all found themes', () => {
      let apiResult = {};
      let apiData = {}
      let toArrayMock = jest.fn();
      let findMock = jest.fn(() => {
        return {
          'toArray' : toArrayMock
        }
      });
      let collection = {
        'find' : findMock
      };
      let returnedItems = [{
        'name' : 'a_theme'
      }];

      mongoResolvers.findAllThemes(undefined, collection, apiData, responseMock);
      let toArrayCallback = toArrayMock.mock.calls[0][0];
      toArrayCallback(undefined, returnedItems);

      let resolveDBResponseMockCallback = resolveDBResponseMock.mock.calls[0][4];
      resolveDBResponseMockCallback(apiResult, returnedItems);

      expect(apiResult.text).toEqual('Here are the themes I found:\na_theme');
    });
  });

  describe('find one theme', () => {
    let resolveDBResponseMock = jest.fn();

    beforeEach(() => {
      mongoResolvers.resolveDBResponse = resolveDBResponseMock;
    });

    test('will resolve search for a theme', () => {
      let collection = {
      };

      mongoResolvers.findOneTheme(undefined, collection, {}, responseMock);
      
      expect(resolveDBResponseMock).toHaveBeenCalledWith(undefined, collection, {}, responseMock, expect.any(Function));
    });

    test('will return theme if found', () => {
      let apiResult = {};
      let foundTheme = {
        'name' : 'a_name',
        'theme_colors' : 'colors'
      };
      
      mongoResolvers.findOneTheme(undefined, {}, {}, responseMock);
      let resolveDBResponseMockCallback = resolveDBResponseMock.mock.calls[0][4];
      resolveDBResponseMockCallback(apiResult, foundTheme);

      expect(resolveDBResponseMock).toHaveBeenCalledWith(undefined, expect.anything(), expect.anything(), expect.anything(), expect.any(Function));

      expect(apiResult).toEqual({ 'text': 'a_name found.\ncolors' });
    });

    test('will return other message if theme not found', () => {
      let apiResult = {};
      
      mongoResolvers.findOneTheme(undefined, {}, {}, responseMock);
      let resolveDBResponseMockCallback = resolveDBResponseMock.mock.calls[0][4];
      resolveDBResponseMockCallback(apiResult, undefined);

      expect(resolveDBResponseMock).toHaveBeenCalledWith(undefined, expect.anything(), expect.anything(), expect.anything(), expect.any(Function));

      expect(apiResult).toEqual({ 'text': 'No such theme found' });
    });
  });

  describe('save theme', () => {
    let resolveDBResponseMock = jest.fn();

    beforeEach(() => {
      mongoResolvers.resolveDBResponse = resolveDBResponseMock;
    });

    test('will resolve saving a theme', () => {
      let collection = {
      };

      mongoResolvers.saveTheme(undefined, collection, {}, responseMock);
      
      expect(resolveDBResponseMock).toHaveBeenCalledWith(undefined, collection, {}, responseMock, expect.any(Function));
    });

    test('will return an error if theme was not saved', () => {
      let apiResult = {};
      let apiData = {}
      let foundTheme = {
        'name' : 'a_name',
        'theme_colors' : 'colors'
      };
      
      mongoResolvers.saveTheme(undefined, {}, apiData, responseMock);
      let resolveDBResponseMockCallback = resolveDBResponseMock.mock.calls[0][4];
      resolveDBResponseMockCallback(apiResult, foundTheme);

      expect(apiResult).toEqual({
        "attachments": [
          {
            "color": "danger", 
            "mrkdwn_in": ["text"], 
            "text": "*Error*:\nA DB error has occured"
          }], 
          "text": ""
        });
    });

    test('will confirm save if theme was saved', () => {
      let apiResult = {};
      let apiData = {}
      let foundTheme = {
        'result' : {
          'ok' : true
        }
      };
      
      mongoResolvers.saveTheme(undefined, {}, apiData, responseMock, 'theme_name', 'theme_colors');
      let resolveDBResponseMockCallback = resolveDBResponseMock.mock.calls[0][4];
      resolveDBResponseMockCallback(apiResult, foundTheme);

      expect(apiResult['text']).toContain('saved with:');
    });
  });
});