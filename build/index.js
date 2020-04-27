"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill/noConflict");

var _scope = require("@dekproject/scope");

var amqp = require("amqp-connection-manager");

var _default = function _default() {
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
            return amqp.connect(["amqp://".concat(env["RABBITMQ_URI"])], socketOptions);
          });
        } else {
          _scope.$.set("rabbitmq", function (socketOptions) {
            return amqp.connect(["amqp://".concat(dbConfig["RABBITMQ_HOST"], ":").concat(dbConfig["RABBITMQ_PORT"])], socketOptions);
          });
        }
      } catch (e) {
        console.log("[ RabbitMQ ] - ".concat(e.message));
      }
    }
  } catch (e) {
    console.log("[ RabbitMQ ] - ".concat(e.message));
  }
};

exports["default"] = _default;
//# sourceMappingURL=index.js.map