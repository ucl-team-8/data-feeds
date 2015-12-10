import fs from "fs";
import Consumer from "./consumer";

let prettyjson = require('prettyjson'),
    StompClient = require('stomp-client').StompClient;

let consumer = new Consumer();
let credentials = require("./credentials.json");

let destination = '/topic/TRAIN_MVT_ALL_TOC',
    client = new StompClient('datafeeds.networkrail.co.uk', 61618, credentials.username, credentials.password, '1.0');

client.connect(function(sessionId) {
    console.log('Trying to connect...');
    client.subscribe(destination, function(body, headers) {
      console.log("Message received.");
      JSON.parse(body).forEach(d => consumer.consume(d));
      // fs.writeFileSync(`public/output/output.json`, JSON.stringify(consumer.toJSON()));
    });
});
