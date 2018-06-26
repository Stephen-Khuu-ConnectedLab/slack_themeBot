// routes/theme_routes.js
module.exports = function(app, db) {
    app.post('/themebot', (req, res) => {
        console.log('=====');
        console.log(res.text);
        console.log('=====');
        // You'll create your note here.
        res.send('Hello')
    });
};