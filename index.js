const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://dw.uptodown.net/dwn/{base64}beatstar-{version}.apk";

async function start() {
  const response = await axios.get(
    "https://beatstar.en.uptodown.com/android/download"
  );
  const $ = cheerio.load(response.data);
  const version = $(".version").text();
  const button = $("#detail-download-button");

  const u =
    "https://dw.uptodown.net/dwn/hhhqJrsH3FqdRT3bVaS_sBfDLqcAKe7c0GU2QlaAmOGnVIwQcGjcuoBCN90iCugkdpvZeTZrh1kdByFHBlCKznSMzOnmvtiTzOfBvXazNXZWG7EzGUwAbAu7yoaT9eQr/VQ2MCqZc_oOWc_p2nnzWnJsuiBYlN_fmJDmdJZmL73GOME1delQ0feRTauzgrO68vTiwMJgPoY0p78kG-SKr1kYwOdMvpCH9UoS1SYwZemNoGuglHJEp2CBBHAbXFDkG/kdhv-9NGsfud9rc9PaNraIAYrsghyR0fVpcv7wqXhkLCSROPUKSvT9NwiY6bdvyuEKhCEjD_HLO56YEaYnkegQ==/beatstar-34-0-0-728.apk";

  const fetchUrl = url
    .replace("{base64}", button.attr("data-url"))
    .replace("{version}", version.replaceAll(".", "-"));

  const apkResponse = await axios.get(fetchUrl, { responseType: "stream" });
  apkResponse.data.pipe(fs.createWriteStream("./beatstar.apk"));
}

start();
