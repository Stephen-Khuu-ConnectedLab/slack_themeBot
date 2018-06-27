const slashCommand = function(command, themeColours, responseData) {
    if (command === 'list') {
        responseData['text'] = 'Here are the themes I found:\ndefault\nconnected';
    } else if (command.indexOf('get') === 0) {
        let commandArgs = command.split(" ");
        let requestedThemeName = commandArgs[1];

        responseData['text'] = requestedThemeName + ' found.\n' +
                               '#F8F8FA,#F8F8FA,#1266fb,#FFFFFF,#FFFFFF,#383F45,#60D156,#DC5960';
    } else if (command.indexOf('save') === 0) {
        let commandArgs = command.split(" ");
        let requestedThemeName = commandArgs[1];

        responseData['text'] = requestedThemeName + ' saved with:\n' +
                                themeColours.join(',');
    }
};

module.exports = slashCommand;