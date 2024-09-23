var fetch = require("node-fetch");

async function main() {
  var x = 0;
  try {
    let res = await fetch("http://localhost:8040/get-records");
    if (res.ok) {
      let records = await res.json();
      if (records) {
        process.exitCode = 0;
        return;
      }
      console.log(records);
    }
  } catch (e) {}
}

main().catch(() => 1);
