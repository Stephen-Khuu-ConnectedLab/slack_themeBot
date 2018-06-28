jest.mock('../../app/theme_bot_controller');
const themeBotController = require('../../app/theme_bot_controller');
const themeRoutes = require('../../app/routes/theme_routes');


afterEach(() =>  {
    jest.resetModules();
});

describe('theme routes', () => {
    test('will map to themebot route', () => {
        let postMock = jest.fn();
    
        themeRoutes({
            'post' : postMock
        });
    
        expect(postMock).toHaveBeenCalledWith('/themebot', expect.anything());
    });
});
