const validator = require('../../app/utils/validator');

describe('validator', () => {
    test('will throw an error when a command does not exist', () => {
        let validationError = validator();
    
        expect(validationError.message).toEqual('Command must be specified\nValid commands are: list, get, save');
    });

    describe('when we have a save command', () => {
        test('will throw an error when there is no theme colour', () => {
            let validationError = validator('save theme_name');

            expect(validationError.message).toEqual('Colours must be provided');
        });

        test('will not throw an error when there are exactly eight colours', () => {
            let validationError = validator('save theme_name', ['#111']);

            expect(validationError.message).toEqual('There must be exactly eight colours to save a slack theme');
        });

        test('will not throw an error when there are exactly eight colours', () => {
            let validationError = validator('save theme_name', ['#111', '#222', 
                                                                '#333', '#444', 
                                                                '#555', '#666', 
                                                                '#777', '#888']);

            expect(validationError).toBe(undefined);
        });
    });

    describe('when we have a get command', () => {
        test('will just pass', () => {
            let validationError = validator('get theme_name');

            expect(validationError).toBe(undefined);
        });
    })
});
