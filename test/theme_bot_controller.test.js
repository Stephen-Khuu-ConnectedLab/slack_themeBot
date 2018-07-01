jest.mock('../app/utils/validator');
jest.mock('../app/db/mongo_util');
jest.mock('../app/utils/command_parser');
const validator = require('../app/utils/validator');
const commandParser = require('../app/utils/command_parser');
const mongoUtil = require('../app/db/mongo_util');
const themeBotController = require('../app/theme_bot_controller');

describe('Theme Bot Controller', () => {
  const jsonMock = jest.fn();
  let responseData;

  beforeEach(() =>  {
    responseData = {
      'json' : jsonMock
    };
    
    commandParser.mockImplementation(() => {
      return {
        command: 'any',
        themeColors: 'some,colors'  
      }
    });
  });

  afterEach(() =>  {
    jest.resetModules();
  });

  test('will return an error if the validator fails', () => {
    validator.mockImplementation(() => new Error('an error message'));

    let requestData = {
      'body' : {
        'text' : 'an invalid request'
      }
    }

    themeBotController(requestData, responseData);

    expect(jsonMock.mock.calls[0][0]['text']).toBe('');
    expect(jsonMock.mock.calls[0][0]['attachments'][0]['text']).toBe("*Error*:\nan error message");
  });

  test('will resolve the command if validator passes', () => {
    validator.mockImplementation(() => {});

    let requestData = {
      'body' : {
        'text' : 'a valid request'
      }
    }

    themeBotController(requestData, responseData);

    expect(mongoUtil).toHaveBeenCalled();
  })
});

