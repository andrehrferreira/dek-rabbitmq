# @dekproject/rabbitmq

RabbitMQ interface plugin for DEK

What does this plugin do?

* Control configuration for connection to RabbitMQ in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ npm i -g @dekproject/cli
$ dek install rabbitmq
```

or

```bash
$ npm i @dekproject/rabbitmq @dekproject/scope
$ nano .env
```

In the .env file add the following settings

```
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

```js
import dotenv from "dotenv";
import { $, plugins, rabbitmq } from "@dekproject/scope";

(async () => {
    dotenv.config({ path: "./.env" });
    await plugins("");

    const PORT = process.env.PORT || 5555;

    $.wait("rabbitmq").then(() => {
        console.log("Connected");

        rabbitmq.createChannel((err, ch) => {
            var q = 'hello';
            var msg = 'Hello World 123!';
            ch.assertQueue(q, { durable: false });
            ch.sendToQueue(q, new Buffer(msg));
            console.log(" [x] Sent %s", msg);
        });
    }).catch((e) => {
        console.log("The wait timeout was reached without loading the dependencies");
        process.exit(-1);
    });
})();
```

Using in the standard DEK skeleton

```js
import { $, rabbitmq } from "@dekproject/scope";

$.wait("rabbitmq").then(() => {
    rabbitmq.createChannel((err, ch) => {
        var q = 'hello';
        var msg = 'Hello World 123!';
        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
});
```
