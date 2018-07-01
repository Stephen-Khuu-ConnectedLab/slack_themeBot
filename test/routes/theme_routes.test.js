jest.mock('../../app/theme_bot_controller');
const themeBotController = require('../../app/theme_bot_controller');
const themeRoutes = require('../../app/routes/theme_routes');


afterEach(() =>  {
    jest.resetModules();
});

describe('theme routes', () => {
    test('will map to themebot route', () => {
        let postMock = jest.fn();
        let res = {};
        let req = {};
        let db = {};

        themeRoutes({
            'post' : postMock
        }, db);
        
        let postCallback = postMock.mock.calls[0][1];
        postCallback(res, req);

        expect(postMock).toHaveBeenCalledWith('/themebot', expect.anything());
        expect(themeBotController).toHaveBeenCalledWith(res, req, db);
    });
});
