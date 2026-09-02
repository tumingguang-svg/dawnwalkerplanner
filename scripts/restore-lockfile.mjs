#!/usr/bin/env node
const fs = require("fs");
const zlib = require("zlib");
const b64 = fs.readFileSync("package-lock.json.gz.b64", "utf8").trim();
fs.writeFileSync("package-lock.json", zlib.gunzipSync(Buffer.from(b64, "base64")));
console.log("Restored package-lock.json (" + fs.statSync("package-lock.json").size + " bytes)");
