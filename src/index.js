import { $ } from "@dekproject/scope";
import amqp from "amqplib";

export default () => {
    try{
        let dbConfig = {};
        let env = process.env;
        let configApproved = true;

        if(!env.hasOwnProperty("RABBITMQ_URI")){
            if(env.hasOwnProperty("RABBITMQ_HOST") && !!env.RABBITMQ_HOST)
                dbConfig["RABBITMQ_HOST"] = env.RABBITMQ_HOST;
            else {
                configApproved = false;
                console.log("[ RabbitMQ ] - There is no RABBITMQ_HOST variable in the .env file.");
            }

            if(env.hasOwnProperty("RABBITMQ_PORT") && !!env.RABBITMQ_PORT)
                dbConfig["RABBITMQ_PORT"] = env.RABBITMQ_PORT;
            else {
                configApproved = false;
                console.log("[ RabbitMQ ] - There is no RABBITMQ_PORT variable in the .env file.");
            }
        }
        else{
            configApproved = true;
        }

        if(!configApproved){
            console.log("[ RabbitMQ ] - Please correct the above errors before restarting the application.");
            process.exit(-1);
        }
        else {
            try {
                if(env.hasOwnProperty("RABBITMQ_URI")){
                    $.set("rabbitmq", (socketOptions) => {
                        return amqp.connect(`amqp://${env["RABBITMQ_URI"]}`, socketOptions);
                    });
                }
                else{
                    $.set("rabbitmq", (socketOptions) => {
                        return amqp.connect(`amqp://${dbConfig["RABBITMQ_HOST"]}:${dbConfig["RABBITMQ_PORT"]}`, socketOptions);
                    });
                }
            }
            catch (e) {
                console.log(`[ RabbitMQ ] - ${e.message}`);
            }
        }
    }
    catch (e) {
        console.log(`[ RabbitMQ ] - ${e.message}`);
    }
};
