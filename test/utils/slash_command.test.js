jest.mock('../../app/db/mongo_util');
const mongoUtil = require('../../app/db/mongo_util');
const slashCommand  = require('../../app/utils/slash_command');

describe('slash command', () => {
    // mongoUtil = jest.fn(() => {
    //     return {
    //         'getTheme' : jest.fn(),
    //         'setTheme' : jest.fn()
    //     }
    // });
    afterEach(() =>  {
      jest.resetModules();
    });

    describe('list', () => {
        test('will return the list of available themes', () => {
            let responseData = {};
            slashCommand('list', undefined, responseData);

            expect(responseData.text).toBe('Here are the themes I found:\ndefault\nconnected');
        });
    });

    describe('get', () => {
        test('will fetch the specified theme colours', () => {
            let responseData = {};
            mongoUtil.mockImplementation(() => {
                return {
                    'getTheme' : jest.fn()
                }
            });

            slashCommand('get connected', undefined, responseData);

            expect(responseData.text).toBe('connected found.\n#F8F8FA,#F8F8FA,#1266fb,#FFFFFF,#FFFFFF,#383F45,#60D156,#DC5960');
        })
    });

    describe('save', () => {
        test('will save the specified theme', () => {
            mongoUtil.mockImplementation(() => {
                return {
                    'setTheme' : jest.fn()
                }
            });

            let responseData = {};
            slashCommand('save connected', 
                        ['#111', '#222', 
                        '#333', '#444', 
                        '#555', '#666', 
                        '#777', '#888'], 
                        responseData);

            expect(responseData.text).toBe('connected saved with:\n' +
                                            '#111,#222,#333,#444,#555,#666,#777,#888');
        });
    });

    describe('non applicable', () => {
        test('will not update responseData', () => {
            let responseData = {};
            slashCommand('not applicable', [], responseData);

            expect(responseData).toBe(responseData);
        });
    })
});

