/**
 * Created by vlad on 01.11.2015.
 */
    var log = require('./app/libs/log')(module);
var app = require('./app/config');
app.use('/api', require('./app/routes'));

app.listen(1338, function () {
    log.info("server started on port 1338")
});