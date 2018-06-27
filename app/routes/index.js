// routes/index.js
const themeRoutes = require('./themeRoutes');

module.exports = function(app, db) {
  themeRoutes(app, db);
};