import "@babel/polyfill/noConflict";

import dotenv from "dotenv";
import { $, plugins, rabbitmq } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("./build");

    $.wait(["rabbitmq"], 5000).then(() => {
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
                        channel.ack(msg);
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
})();
