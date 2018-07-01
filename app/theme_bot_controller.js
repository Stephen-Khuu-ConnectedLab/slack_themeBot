const commandParser = require('./utils/command_parser');
const validator = require('./utils/validator');
const mongoUtil = require('./db/mongo_util');
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

      res.json(responseData);
  } else {
    mongoUtil(db, command, themeColors, responseData, res);
  }
};

module.exports = themeBotController;