const errorAttachment = (error) => ({
  color: 'danger',
  text: `*Error*:\n${error}`,
  mrkdwn_in: ['text']
});

module.exports = errorAttachment;