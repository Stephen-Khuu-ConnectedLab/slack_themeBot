const validator = (rawCommand, theme_colors) => {
    const validCommands = ['list', 'get', 'save'];

    if (!rawCommand) {
        return new Error('Command must be specified\n' + 'Valid commands are: ' + validCommands.join(', '));
    } else {
        let commandTokens = rawCommand.split(" ");
        let command = commandTokens[0];
    
            //If command is either 'get' or 'set'
        if (command.indexOf('save') != -1) {
            if (!theme_colors) {
                return new Error('Colours must be provided');
            } else {
                if (theme_colors.length != 8) {
                    return new Error('There must be exactly eight colours to save a slack theme');
                }
            }
        }
    }
}

module.exports = validator;