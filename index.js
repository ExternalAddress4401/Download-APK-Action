const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
const fs = require("fs");

const url =
  "https://apkpure.com/beatstar-touch-your-music/com.spaceapegames.beatstar/downloading";

async function start() {
  const fetchUrl = url
    .replace("{base64}", core.getInput("data-url"))
    .replace("{version}", core.getInput("version").replaceAll(".", "-"));

  const apkResponse = await axios.get(fetchUrl, { responseType: "stream" });
  apkResponse.data.pipe(fs.createWriteStream("./apk/beatstar.apk"));
}

start();
