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
    let connection = rabbitmq();

    connection.on("connect", () => {
        console.log("Connected!");
    });
    
    connection.on("disconnect", () => {
        console.log("Disconnected.");
    });

    let channelWrapper = connection.createChannel({
        json: true,
        setup: (channel) => {
            return Promise.all([
                channel.assertQueue("hello", { exclusive: true, autoDelete: true }),
                channel.prefetch(1),
                channel.consume("hello", (msg) => {
                    console.log(" [x] Received '%s'", msg.content.toString());
                    channelWrapper.ack(msg);
                }, { noAck: true })
            ]);
        }
    });

    channelWrapper.waitForConnect().then(() => {
        console.log("Listening for messages");
        channelWrapper.sendToQueue("hello", { hello: "world" });
    });     
}).catch((err) => {
    console.log(err);
    process.exit(-1);
});
```
