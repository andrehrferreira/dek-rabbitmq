import dotenv from "dotenv";
import { $, plugins, rabbitmq } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("");

    $.wait("rabbitmq").then(() => {
        //console.log("Connected");

        rabbitmq.createChannel((err, ch) => {
            var q = "hello";
            var msg = "Hello World 123!";
            ch.assertQueue(q, { durable: false });
            ch.sendToQueue(q, Buffer.from(msg));
            //console.log(" [x] Sent %s", msg);
        });
    }).catch((err) => {
        console.log(err);
        process.exit(-1);
    });
})();
