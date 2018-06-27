// jest.mock('../../app/routes/theme_routes');
const themeBotController = require('../../app/themeBotController');
const themeRoutes = require('../../app/routes/themeRoutes');

afterEach(() =>  {
    jest.resetModules();
});

describe('theme routes', () => {
    test('will map to themebot route', () => {
        let postMock = jest.fn();
    
        themeRoutes({
            'post' : postMock
        });
    
        expect(postMock).toHaveBeenCalledWith('/themebot', themeBotController);
    });
});
