const commandParser = require('../../app/utils/command_parser');

describe('command parser', () => {
    test('will retrieves command from command text', () => {
        let parsedArguments = commandParser('list');
    
        expect(parsedArguments['command']).toBe('list');
    });
    
    const behaveLikeCommandWithPrompt = function(commandName) {
        test('will not retrieve ' + commandName + ' command by itself', () => {
            let parsedArguments = commandParser(commandName);

            expect(parsedArguments['command']).toBe(undefined);
        });

        test('will not retrieve ' + commandName + ' command without another name', () => {
            let parsedArguments = commandParser(commandName + ' #1000 #2000');
        
            expect(parsedArguments['command']).toBe(undefined);
        });

        test('will retrieve get command with requested theme name from command text', () => {
            let parsedArguments = commandParser(commandName + ' theme_name ignored_text');
        
            expect(parsedArguments['command']).toBe(commandName + ' theme_name');
        });
    };

    describe('get command', () => {
        behaveLikeCommandWithPrompt('get');
    });

    describe('save command', () => {
        behaveLikeCommandWithPrompt('save');
    });
    
    describe('theme colours', () => {
        test('will retrieve valid theme colours', () => {
            let parsedArguments = commandParser('save new_theme #100 #200333');
        
            expect(parsedArguments['themeColors'][0]).toBe("#100");
            expect(parsedArguments['themeColors'][1]).toBe("#200333");
        });
        
        test('will not retrieve invalid theme colours', () => {
            let parsedArguments = commandParser('save new_theme #XXX');
        
            expect(parsedArguments['themeColors']).toBe(undefined);
        });
    });   
});
