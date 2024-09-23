#!/usr/bin/env node
import minimist from "minimist";
import path from "path";

var args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});

if (args.file) {
  let filepath = path.resolve(args.file); // just get the relative path if dont passed the full path
  console.log(filepath);
  console.log(__dirname); // current directory of the current file
}
function error(msg, includeHelp = false) {
  console.error(msg);
}
// *************** access files ****************
import fs from "fs";
function processFile(filepath) {
  var contents = fs.readFileSync(filepath);
  console.log(contents); //<Buffer 68 65 6c 6c 6f 20 73 61 69 6c 6f 72 73 21>
  process.stdout.write(contents); // hello sailors!

  var contents2 = fs.readFileSync(filepath, "utf8");
  console.log(contents2); // hello sailors!
}

if (args.file) {
  processFile(path.resolve(args.file));
  //./file-handling/index.js --file=file-handling/sample.txt
}

function processAsyncFile(filepath) {
  var contents = fs.readFile(filepath, function onContents(err, contents) {
    if (err) {
      error(err.toString());
    } else {
      process.stdout.write(contents); // hello sailors!
    }
  });
}

if (args.file) {
  processAsyncFile(path.resolve(args.file));
}
// *************** write files ****************
import getStdin from "get-stdin";
if (args.in) {
  getStdin(args.in).then(proccessFile).catch(error);
  // cat ./file-handling/sample.txt | file-handling/index.js --in
}

function proccessFile(contents) {
  contents = contents.toUpperCase();
  process.stdout.write(contents);
}
