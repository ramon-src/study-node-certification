# study-node-certification

IO tasks

- Networking connections
- Read and Write files

Node is about modelling I/O in an efficient way.

Node don't use of threads from CPU for parallelism.
The asynchronous event loop is a much more compelling model for I/O bound tasks.
The node benefits are high throughput, low latency, I/O communication.
But CPU bounds it's better to use another language, then working with child processes.

For node everything from startup should be asynchronous
In a command line script, everything is part of the startup basically

### Streams

65k internal buffer size.
Using streams node will read and write the streams in chunks so it uses in a more performant way the memory. Improving garbage collector.
It's different than just reading buffers convert them to string and stdout.
All streams operations are asynchronous.

async generators we can use CAS to generate async functions from generators

Http can send chunk responses, but many times it just response a big chunk
We can use node fetch, supports streaming API, it can listen to streams, asyng generators generating readable and iterable streams.

Why do we need streams?
Increase performance of reading and transforming data.

### Libs

- minimist: auto parsing arguments from command line
- yargs: auto create the help with all args, build in top of minimist
- get-stdin:

### Debug

Open chrome dev tools

```sh
node --inspect
```
