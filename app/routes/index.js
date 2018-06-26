// routes/index.js
const themeRoutes = require('./theme_routes');
module.exports = function(app, db) {
  themeRoutes(app, db);
  // Other route groups could go here, in the future
};