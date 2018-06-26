// routes/theme_routes.js
module.exports = function(app, db) {
    app.post('/themebot', (req, res) => {
        console.log('=====');
        console.log(req.body.text);
        console.log('=====');
        // You'll create your note here.
        //res.send('Hello');

        let data = {
            response_type: 'in_channel', // public to the channel
            text: '#F8F8FA,#F8F8FA,#1266fb,#FFFFFF,#FFFFFF,#383F45,#60D156,#DC5960'
        };
          
        res.json(data);
    });
};