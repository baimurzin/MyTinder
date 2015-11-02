/**
 * Created by vlad on 02.11.2015.
 */
var winston = require('winston');

function getLogger(module) {
    var path = module.filename.split('\\').slice(-2).join('\\'); //��������� ����� � ������ �����, ������� ������� ���������

    return new winston.Logger({
        transports : [
            new winston.transports.Console({
                colorize:   true,
                level:      'debug',
                label:      path
            })
        ]
    });
}

module.exports = getLogger;