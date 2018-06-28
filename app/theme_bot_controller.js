const commandParser = require('./utils/command_parser');
const validator = require('./utils/validator');
const slashCommand = require('./utils/slash_command');
const errorAttachment = require('./utils/error_attachment');

const themeBotController = function(req, res, db) {
  let responseData = {
    color: 'good',
    response_type: 'in_channel', // public to the channel
    mrkdwn_in: ['text']
  };
  let error;

  const { command, themeColors } = commandParser(req.body.text);

  if ((error = validator(command, themeColors))) {
      responseData = {
          text: '',
          attachments: [errorAttachment(error.message)]
      };
  } else {
    //determine which command to execute
    //send to db
    //  |___> db fnished request
    
    //slashCommand(command, themeColors, responseData, db);   
    
    if (command === 'list') {
      db.collection('theme-bot-api', function(err, collection) {
        collection.find().toArray(function(err, items) {
          console.log(items);
          //res.send(items);
          let themeNames = items.map(theme => theme['name']);

          responseData['text'] = 'Here are the themes I found:\n' + themeNames.join('\n');
          
          res.json(responseData);
        });
      });
      

    } else if (command.indexOf('get') === 0) {
      let commandArgs = command.split(" ");
      let requestedThemeName = commandArgs[1];
      
      //TODO: add callback and let slash command deal with it
      //mongoUtil(db).getTheme(requestedThemeName, resolveQuery);

      //stub db, collection, trigger callback on findOne
      db.collection('theme-bot-api').findOne({
        'name' : requestedThemeName
      }, (err, item) => {
        if (err) {
            responseData = {
                text: '',
                attachments: [errorAttachment('A DB error has occured')]
            };
        } else {     
          let responseText = '';

          if (item) {
            responseText = item['name'] + ' found.\n' +
                            item['theme_colors'];
          } else {
            responseText = 'No such theme found';
          }
          responseData['text'] = responseText;

          res.json(responseData);
        }
      });

      // responseData['text'] = requestedThemeName + ' found.\n' +
      //                       '#F8F8FA,#F8F8FA,#1266fb,#FFFFFF,#FFFFFF,#383F45,#60D156,#DC5960';
    } else if (command.indexOf('save') === 0) {
      let commandArgs = command.split(" ");
      let requestedThemeName = commandArgs[1];
      let requestedThemeColors = themeColours.join(',');

      db.collection('theme-bot-api').update({
        'name' : requestedThemeName
      },
      {
        'name' : requestedThemeName,
        'theme_colors' : requestedThemeColors
      }, {
        upsert: true
      },(err, item) => {
        if (err) {
          responseData = {
              text: '',
              attachments: [errorAttachment('A DB error has occured')]
          };
        } else {          
          responseData['text'] = item['name'] + ' saved with:\n' +
                                  item['theme_colors'];

          res.json(responseData);
        }
      });

      // responseData['text'] = requestedThemeName + ' saved with:\n' +
      //                         themeColours.join(',');
    } 
  }
};

module.exports = themeBotController;