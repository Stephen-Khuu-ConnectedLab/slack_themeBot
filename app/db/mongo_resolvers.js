const errorAttachment = require('../utils/error_attachment');

let mongoResolver = {};

mongoResolver.resolveDBResponse = function (err, dbResponseData, apiResponseData, apiResponse, callback) {
  if (err) {
    apiResponseData = {
        text: '',
        attachments: [errorAttachment('A DB error has occured')]
    };

    apiResponse.json(apiResponseData);
  } else {     
    callback(apiResponseData, dbResponseData);
    apiResponse.json(apiResponseData);
  }
}

mongoResolver.findAllThemes = function (err, collection, apiResponseData, apiResponse) {
  if (err) {
    apiResponseData = {
        text: '',
        attachments: [errorAttachment('A DB error has occured')]
    };

    apiResponse.json(apiResponseData);
  } else {
    collection.find().toArray(function(err, items) {
      mongoResolver.resolveDBResponse(err, items, apiResponseData, apiResponse, function(responseData, items) {
        let themeNames = items.map(theme => theme['name']);
  
        responseData['text'] = 'Here are the themes I found:\n' + themeNames.join('\n');
      });
    });
  }
}

mongoResolver.findOneTheme = function (err, item, apiResponseData, apiResponse) {
  mongoResolver.resolveDBResponse(err, item, apiResponseData, apiResponse, function(responseData, item) {
    let responseText = '';

    if (item) {
      responseText = item['name'] + ' found.\n' +
                      item['theme_colors'];
    } else {
      responseText = 'No such theme found';
    }
    responseData['text'] = responseText;
  });  
}

mongoResolver.saveTheme = function(err, item, apiResponseData, apiResponse, requestedThemeName, requestedThemeColors) {
  mongoResolver.resolveDBResponse(err, item, apiResponseData, apiResponse, function(responseData, item) {
    if(item.result && item.result.ok) {
      responseData['text'] = requestedThemeName + ' saved with:\n' +
                              requestedThemeColors;
    } else {
      responseData['text'] = '';
      responseData['attachments'] = [errorAttachment('A DB error has occured')];
    }
  });
}

module.exports = mongoResolver;