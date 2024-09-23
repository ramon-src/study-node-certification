# Events

EventEmitter is at the core of Node asynchronous event-driven architecture. Many of Node’s built-in modules inherit from EventEmitter.

HTTP requests, responses and streams implement the EventEmitter module, so they can provide a way to emit and listen to events.

```js
const EventEmitter = require("events");
```

Events are a great way for applications to allow multiple external plugins to build functionality on top of the application’s core.

You can think of them as hook points to allow for customizing the story around a state change.

The original way Node handled asynchronous events was with callback.

Callbacks are basically just functions that you pass to other functions. This is possible in JavaScript because functions are first class objects.
The callback convention in Node is always receiving error as first param, and payload in the second.

## Event Emitter Module

The concept is simple: emitter objects emit named events that cause previously registered listeners to be called.

So, an emitter object basically has two main features:

- Emitting name events.
- Registering and unregistering listener functions.

Emitting an event is the signal that some condition has occurred. This condition is usually about a state change in the emitting object.

```js
const emitter = new EventEmitter();
emitter.emit("something-happened");
```

We can add listener functions using the on method, and those listener functions will be executed every time the emitter object emits their associated name event.

Events !== Asynchrony

```js
const EventEmitter = require("events");

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log("Before executing");
    this.emit("begin");
    taskFunc();
    this.emit("end");
    console.log("After executing");
  }
}

const withLog = new WithLog();

withLog.on("begin", () => console.log("About to execute"));
withLog.on("end", () => console.log("Done with execute"));

withLog.execute(() => console.log("*** Executing task ***"));
```

What I want you to notice about the output above is that it all happens synchronously. There is nothing asynchronous about this code.

```js
const fs = require("fs");
const EventEmitter = require("events");

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    console.time("execute");
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }

      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    });
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

withTime.execute(fs.readFile, __filename);
```

Note how we needed to combine a callback with an event emitter to accomplish that. If the asynFunc supported promises as well, we could use the async/await feature to do the same:

```js
class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit("begin");
    try {
      console.time("execute");
      const data = await asyncFunc(...args);
      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    } catch (err) {
      this.emit("error", err);
    }
  }
}
```

### Order of Listeners

If we register multiple listeners for the same event, the invocation of those listeners will be in order. The first listener that we register is the first listener that gets invoked.

```js
withTime.on("data", (data) => {
  console.log(`Length: ${data.length}`);
});

withTime.on("data", (data) => {
  console.log(`Characters: ${data.toString().length}`);
});
// Define a listener after but make it been called before all
withTime.prependListener("data", (data) => {
  console.log(`Characters: ${data.toString().length}`);
});

withTime.execute(fs.readFile, __filename);
```
