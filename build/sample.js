"use strict";

require("@babel/polyfill/noConflict");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _scope = require("@dekproject/scope");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _dotenv["default"].config();

          _context.next = 3;
          return (0, _scope.plugins)("./build");

        case 3:
          _scope.$.wait(["rabbitmq"], 5000).then(function () {
            var connection = (0, _scope.rabbitmq)();
            connection.on("connect", function () {
              console.log("Connected!");
            });
            connection.on("disconnect", function () {
              console.log("Disconnected.");
            });
            var channelWrapper = connection.createChannel({
              json: true,
              setup: function setup(channel) {
                return Promise.all([channel.assertQueue("hello", {
                  exclusive: true,
                  autoDelete: true
                }), channel.prefetch(1), channel.consume("hello", function (msg) {
                  console.log(" [x] Received '%s'", msg.content.toString());
                  channelWrapper.ack(msg);
                }, {
                  noAck: true
                })]);
              }
            });
            channelWrapper.waitForConnect().then(function () {
              console.log("Listening for messages");
              channelWrapper.sendToQueue("hello", {
                hello: "world"
              });
            });
          })["catch"](function (err) {
            console.log(err);
            process.exit(-1);
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
//# sourceMappingURL=sample.js.map