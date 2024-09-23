#!/usr/bin/env node

"use strict";

var util = require("util");
var cp = require("child_process");

async function main() {
  var child = cp.spawn("node", ["x.js"]);
  child.on("exit", function (code) {
    console.log("Child Finished", code);
  });
}
