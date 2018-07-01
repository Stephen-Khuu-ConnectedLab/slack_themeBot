const mongoResolvers = require('./mongo_resolvers');

const mongoUtil = function(db, command, themeColors, responseData, res) {
  if (command.indexOf('list') === 0) {
    db.collection('theme-bot-api', function(err, collection) {
      mongoResolvers.findAllThemes(err, collection, responseData, res);
    });
  } else if (command.indexOf('get') === 0) {
    let commandArgs = command.split(" ");
    let requestedThemeName = commandArgs[1];

    db.collection('theme-bot-api').findOne({
      'name' : requestedThemeName
    }, function(err, item) {
      mongoResolvers.findTheme(err, item, responseData, res);
    });
  } else if (command.indexOf('save') === 0) {
    let commandArgs = command.split(" ");
    let requestedThemeName = commandArgs[1];
    let requestedThemeColors = themeColors.join(',');

    db.collection('theme-bot-api').update({
      'name' : requestedThemeName
    },
    {
      'name' : requestedThemeName,
      'theme_colors' : requestedThemeColors
    }, {
      upsert: true
    }, function(err, item) {
      mongoResolvers.saveTheme(err, item, responseData, res, requestedThemeName, requestedThemeColors);
    });

  }
}

module.exports = mongoUtil;