#!/usr/bin/env node
// use node to run this file in command line
// add chmod +x index.js and then run ./index.js
"use strict";

printHelp();

function printHelp() {
  console.log("Usage: node index.js");
  console.log("  -h, --help  print this help");
  console.log("  -f, --file  file to read");
}

// POSIX style programming
//access the stream from standart output
process.stdout.write("hello world\n");
console.log("hello world");

process.stderr.write("Oops\n");
console.error("Oops");

// process.stdin.read();

//*************** Working with arguments ****************

console.log(process.argv);
//./x.js --hello=world
// response:
// [
//   "/opt/homebrew/Cellar/node/21.7.2/bin/node",
//   "/Users/ramon/development/git/study-node-certification/x.js",
//   "--hello=world",
// ];
console.log(process.argv.slice(2));
//[ '--hello=world', '--c9=' ]

// package for parsing arguments from command line
var args = require("minimist")(process.argv.slice(2), {
  //overwrite default settings
  boolean: ["help"],
  string: ["file"],
});
console.log(args);
//./x.js --hello=world --c9=9
// { _: [], hello: 'world', c9: 9 }

// *************** working with errors ****************

function error(msg, includeHelp = false) {
  console.error(msg);
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}

if (args.help) {
  printHelp();
} else if (args.file) {
  var fs = require("fs");
  fs.readFile(args.file, "utf8", function (err, data) {
    if (err) {
      error(err);
      process.exit(1);
    }
    console.log(data);
  });
} else {
  error("No file specified", true);
  process.exit(1);
}
