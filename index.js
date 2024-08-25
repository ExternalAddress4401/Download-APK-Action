const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url =
  "https://apkpure.com/beatstar-touch-your-music/com.spaceapegames.beatstar/downloading";

async function start() {
  const apk = await axios.get(url, { responseType: "stream" });
  apk.data.pipe(fs.createWriteStream("./beatstar.apk"));
}

start();
