// routes/theme_routes.js
const themeBotController = require('../themeBotController');

module.exports = function(app, db) {
    app.post('/themebot', themeBotController);
};