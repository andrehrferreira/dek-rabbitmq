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
