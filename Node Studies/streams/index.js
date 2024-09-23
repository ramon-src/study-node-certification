#!/usr/bin/env node
import fs from "fs";
import minimist from "minimist";
import path from "path";
import stream from "stream";
import zlib from "zlib";
var Transform = stream.Transform;
var BASE_PATH = process.env.BASE_PATH || __dirname;
var OUTFILE = process.env.OUTFILE || path.join(BASE_PATH, "out.txt");
var args = minimist(process.argv.slice(2), {
  boolean: ["help", "in", "out", "compress", "uncrompress"],
  string: ["file"],
});
// var stream1;
// var stream2;
// var stream3;

// stream3 = stream1.pipe(stream2);

if (args.in || args._.includes("-")) {
  proccessFile(process.stdin);
} else if (args.file) {
  let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
  proccessFile(stream);
}

/**
 * Read from incomeStream and write to targetStream with all text uppercased.
 * @param {stream.Readable} incomeStream
 *      The stream to read from.  This is typically a file or stdin.
 * @param {stream.Writable} targetStream
 *      The stream to write to.  This is typically stdout or a file.
 */
async function proccessFile(incomeStream) {
  var outStream = incomeStream;

  if (args.uncrompress) {
    let unzipStream = zlib.createGunzip();
    outStream = outStream.pipe(unzipStream);
  }

  var upperStream = new Transform({
    transform(chunk, encoding, cb) {
      this.push(chunk.toString().toUpperCase());
      setTimeout(cb, 1000);
      cb();
    },
  });
  var targetStream;
  if (args.compress) {
    let gzipStream = zlib.createGzip();
    outStream = outStream.pipe(gzipStream);
    OUTFILE = `${OUTFILE}.gz`;
  }
  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream(path.join(OUTFILE));
  }
  outStream = outStream.pipe(upperStream);
  outStream.pipe(targetStream);
  await streamComplete(outStream);
}
//BASE_PATH=streams ./streams/index.js --file=lorem.txt

// receives a stream and returns a promise waiting on the stream to end
function streamComplete(stream) {
  return new Promise((resolve, reject) => {
    stream.on("end", () => resolve());
  });
}
// could be used in this case to ensure everything is done
var allDone = Promise.all([
  streamComplete(stream1),
  streamComplete(stream2),
]).then((responses) => {
  responses[0];
  responses[1];
});
