const errorAttachment = require('../../app/utils/error_attachment');

describe('Error attachment', () => {
  test('will return an error object', () => {
    let result = errorAttachment('an error');

    expect(result).toEqual({
                          color: 'danger',
                          text: `*Error*:\nan error`,
                          mrkdwn_in: ['text']
                        });
  })
});