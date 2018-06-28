const mongoUtil = function(db) {
  const getTheme = function(themeName, callback) {
    db.collection('theme-bot-api').findOne({
      'name' : themeName
    }, (err, item) => {
      callback(err, item);
    });
  };

  const setTheme = function(themeName, themeColours, callback) {
    db.collection('theme-bot-api').update({
      'name' : themeName
    },
    {
      'name' : themeName,
      'theme_colors' : themeColours
    }, {
      upsert: true
    },(err, item) => {
      callback(err, item);
    });
  }

  return {
    'getTheme' : getTheme,
    'setTheme' : setTheme
  }
};

module.exports = mongoUtil;