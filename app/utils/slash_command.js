const errorAttachment = require('../utils/error_attachment');
const mongoUtil = require('../db/mongo_util');

const resolveQuery = function(err, item) {
    if (err) {
        return {
        'error' : 'A DB error has occured'
        };
    } else {
        return item;
    }
};

const slashCommand = function(command, themeColours, responseData, db) {
    if (command === 'list') {
        responseData['text'] = 'Here are the themes I found:\ndefault\nconnected';
    } else if (command.indexOf('get') === 0) {
        let commandArgs = command.split(" ");
        let requestedThemeName = commandArgs[1];
        
        //TODO: add callback and let slash command deal with it
        mongoUtil(db).getTheme(requestedThemeName, resolveQuery);
        
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