import dotenv from "dotenv";
import { $, plugins, rabbitmq } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("");

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
})();
