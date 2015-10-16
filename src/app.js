"use strict";

const gpio = require("gpio");

const channel = {
  led: 4,
  pir: 17
};

const led = gpio.export(channel.led, {
  direction: "out",
  ready() {}
});

const pir = gpio.export(channel.pir, {
  direction: "in",
  ready() {
    console.log("PIR ready"); 
  }
});

pir.on("change", (val) => {
  console.log(val ? "ON" : "OFF");
  led.set(val);
});

process.on("SIGINT", () => {

  led.reset();
  led.unexport();

  pir.reset();
  pir.unexport();

  console.log("\nBye!!");
});
