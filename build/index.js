'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require('@dekproject/scope');

var _callback_api = require('amqplib/callback_api');

var _callback_api2 = _interopRequireDefault(_callback_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    try {
        var dbConfig = {};
        var env = process.env;
        var authUrl = null;
        var configApproved = true;

        if (!env.hasOwnProperty('RABBITMQ_URI')) {
            if (env.hasOwnProperty('RABBITMQ_HOST') && !!env.RABBITMQ_HOST) dbConfig['RABBITMQ_HOST'] = env.RABBITMQ_HOST;else {
                configApproved = false;
                console.log('[ RabbitMQ ] - There is no RABBITMQ_HOST variable in the .env file.');
            }

            if (env.hasOwnProperty('RABBITMQ_PORT') && !!env.RABBITMQ_PORT) dbConfig['RABBITMQ_PORT'] = env.RABBITMQ_PORT;else {
                configApproved = false;
                console.log('[ RabbitMQ ] - There is no RABBITMQ_PORT variable in the .env file.');
            }
        } else {
            configApproved = true;
        }

        if (!configApproved) {
            console.log('[ RabbitMQ ] - Please correct the above errors before restarting the application.');
            process.exit(-1);
        } else {
            try {
                if (env.hasOwnProperty('RABBITMQ_URI')) {
                    _callback_api2.default.connect('amqp://' + env['RABBITMQ_URI'], function (err, conn) {
                        if (err) console.log('[ RabbitMQ ] - ' + err);else {
                            if (process.env.DEBUG == 'true') console.log('[ RabbitMQ ] - RabbitMQ successfully signed');

                            _scope.$.set("rabbitmq", conn);
                        }
                    });
                } else {
                    _callback_api2.default.connect('amqp://' + dbConfig['RABBITMQ_HOST'] + ':' + dbConfig['RABBITMQ_PORT'], function (err, conn) {
                        if (err) console.log('[ RabbitMQ ] - ' + err);else {
                            if (process.env.DEBUG == 'true') console.log('[ RabbitMQ ] - RabbitMQ successfully signed');

                            _scope.$.set("rabbitmq", conn);
                        }
                    });
                }
            } catch (e) {
                console.log('[ RabbitMQ ] - ' + e.message);
            }
        }
    } catch (e) {
        console.log('[ RabbitMQ ] - ' + e.message);
    }
};
//# sourceMappingURL=index.js.map