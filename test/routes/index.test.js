jest.mock('../../app/routes/themeRoutes');
const themeRoutesMock = require('../../app/routes/themeRoutes');
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
