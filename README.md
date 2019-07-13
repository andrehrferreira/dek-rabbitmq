# @dekproject/rabbitmq

RabbitMQ interface plugin for DEK

What does this plugin do?

* Control configuration for connection to RabbitMQ in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/rabbitmq --save
```

In the .env file add the following settings

```
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

## Usage

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
