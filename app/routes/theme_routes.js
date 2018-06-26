// routes/theme_routes.js
module.exports = function(app, db) {
    app.post('/themebot', (req, res) => {
        console.log(req);
        console.log(res);
        // You'll create your note here.
        res.send('Hello')
    });
};