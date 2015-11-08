/**
 * Created by vlad on 01.11.2015.
 */
var log = require('./app/libs/log')(module);
var app = require('./app/config');
var config = require('./app/config/config');
app.use('/api', require('./app/routes'));


app.set('port', config.get('port'));

app.listen(app.get('port'), function () {
    log.info("server started on port " + app.get('port'));
});