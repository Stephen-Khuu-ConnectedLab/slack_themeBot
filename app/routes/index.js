// routes/index.js
const themeRoutes = require('./theme_routes');

module.exports = function(app, db) {
  themeRoutes(app, db);
};