const commandParser = require('./utils/commandParser');
const validator = require('./utils/validator');
const slashCommand = require('./utils/slashCommand');

const createErrorAttachment = (error) => ({
  color: 'danger',
  text: `*Error*:\n${error.message}`,
  mrkdwn_in: ['text']
});

const themeBotController = function(req, res) {
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
          attachments: [createErrorAttachment(error)]
      };
  } else {
    slashCommand(command, themeColors, responseData);    
  }

  res.json(responseData);
};

module.exports = themeBotController;