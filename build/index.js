"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require("@dekproject/scope");

var _amqplib = require("amqplib");

var _amqplib2 = _interopRequireDefault(_amqplib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    try {
        var dbConfig = {};
        var env = process.env;
        var configApproved = true;

        if (!env.hasOwnProperty("RABBITMQ_URI")) {
            if (env.hasOwnProperty("RABBITMQ_HOST") && !!env.RABBITMQ_HOST) dbConfig["RABBITMQ_HOST"] = env.RABBITMQ_HOST;else {
                configApproved = false;
                console.log("[ RabbitMQ ] - There is no RABBITMQ_HOST variable in the .env file.");
            }

            if (env.hasOwnProperty("RABBITMQ_PORT") && !!env.RABBITMQ_PORT) dbConfig["RABBITMQ_PORT"] = env.RABBITMQ_PORT;else {
                configApproved = false;
                console.log("[ RabbitMQ ] - There is no RABBITMQ_PORT variable in the .env file.");
            }
        } else {
            configApproved = true;
        }

        if (!configApproved) {
            console.log("[ RabbitMQ ] - Please correct the above errors before restarting the application.");
            process.exit(-1);
        } else {
            try {
                if (env.hasOwnProperty("RABBITMQ_URI")) {
                    _scope.$.set("rabbitmq", function (socketOptions) {
                        return _amqplib2.default.connect("amqp://" + env["RABBITMQ_URI"], socketOptions);
                    });
                } else {
                    _scope.$.set("rabbitmq", function (socketOptions) {
                        return _amqplib2.default.connect("amqp://" + dbConfig["RABBITMQ_HOST"] + ":" + dbConfig["RABBITMQ_PORT"], socketOptions);
                    });
                }
            } catch (e) {
                console.log("[ RabbitMQ ] - " + e.message);
            }
        }
    } catch (e) {
        console.log("[ RabbitMQ ] - " + e.message);
    }
};
//# sourceMappingURL=index.js.map