jest.mock('../../app/routes/theme_routes');
const themeRoutesMock = require('../../app/routes/theme_routes');
const routeIndex = require('../../app/routes/index');

afterEach(() =>  {
    jest.resetModules();
});

describe('route index', () => {
    test('will delegate routing to theme routes', () => {
        routeIndex();
    
        expect(themeRoutesMock).toHaveBeenCalled();
    });
});
