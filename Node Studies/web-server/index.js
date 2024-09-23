import http from "http";
const HTTP_PORT = 8040;

function createServer() {
  return http.createServer(handleRequest);
}

function main() {
  const server = createServer();
  server.listen(HTTP_PORT);
}

async function handleRequest(req, res) {
  // req and res are http streams

  if (req.url === "/hello") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  } else if (req.url === "/get-records") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    });
    res.end(JSON.stringify(getAllRecords()));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

main();

async function getRecords() {
  recordList.innerHTML = "";
  let res = await fetch("/get-records");
}

function getAllRecords() {
  return Promise.resolve([{ hello: "world" }, { hello: "sailor" }]);
}

function defineRoutes() {
  // define routes
}
