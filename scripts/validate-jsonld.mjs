import fs from "fs";

const html = fs.readFileSync("index.html", "utf8");
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!match) {
  console.error("JSON-LD script not found");
  process.exit(1);
}
const data = JSON.parse(match[1]);
const types = data["@graph"].map((node) => node["@type"]);
console.log(types.join(", "));
if (types.includes("FAQPage")) {
  console.error("FAQPage still present");
  process.exit(1);
}
console.log("jsonld ok");
