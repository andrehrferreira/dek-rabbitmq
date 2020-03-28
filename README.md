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
    rabbitmq().then(function(conn) {
        conn.createChannel().then((ch) => {
            let ok = ch.assertQueue("hello", {durable: false});
        
            ok = ok.then(() => {
                return ch.consume("hello", (msg) => {
                    console.log(" [x] Received '%s'", msg.content.toString());
                }, { noAck: true });
            });
        
            return ok.then(() => {
                console.log(" [*] Waiting for messages. To exit press CTRL+C");
            });
        });    
    });
}).catch((err) => {
    console.log(err);
    process.exit(-1);
});
```
