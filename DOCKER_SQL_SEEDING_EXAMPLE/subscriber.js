import { createClient } from "redis";
import { CHANNEL_NAME } from "./constant.js";

function subscribePlugin(fastify, opts, done) {
  function subscriber() {
    const subscribe = createClient();

    function listner(message) {
      console.log("> Message Received:", message);
      const { x_com } = JSON.parse(message);
      fastify.pg.query(
        "INSERT INTO request_status(x_com, count) VALUES($1, $2) RETURNING *",
        [x_com, 1],
        function onResult(err, _result) {
          if (!err) {
            fastify.log.info("Insert sucessfull !");
          } else {
            fastify.log.info("Error !");
          }
        }
      );
    }

    subscribe.on("error", function (err) {
      console.log("Error:", err);
    });
    subscribe.on("connect", function () {
      console.log("Connected");
    });

    subscribe.subscribe(CHANNEL_NAME, listner);

    subscribe.connect();
  }
  subscriber();
  done();
}

export { subscribePlugin };
