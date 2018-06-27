// routes/theme_routes.js
const themeBotController = require('../theme_bot_controller');

module.exports = function(app, db) {
    app.post('/themebot', themeBotController);
};