import fs from "fs";
import path from "path";
import sendSlackMessage from "./utils/slack.js";
import checkOneul from "./sites/oneul.js";
import checkJungban from "./sites/jungban.js";


// 일정 시간마다 조회 후 슬랙으로 발송
async function checkSitesFeeds() {
  console.group(new Date().toLocaleString());

  // 오늘식당 조회 및 슬랙 메시지 전송
  console.log(":: Start Check Oneul Menu");
  // const oneulMenu = await checkOneul();
    const oneulMenu = 'https://scontent-nrt1-1.cdninstagram.com/v/t51.29350-15/447457571_6254264108031393_4747266383530006148_n.heic?stp=c0.141.1131.1131a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Sz_vXTuMyjUQ7kNvgFAThco&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYDIc0Cm5Xx75joCjAhK9V2tmsNdxx9MIiVbZu6l-OEifQ&oe=6667907D&_nc_sid=8b3546';
  console.log(":: End Check Oneul Menu (" + oneulMenu.length + ")");

  console.log(":: Start Check Jungban Menu");
  const jungbanMenu = await checkJungban();
  console.log(":: End Check Jungban Menu(" + jungbanMenu.length + ")");

  if (oneulMenu.length > 0) {
    console.log(":: Send Slack Message - Oneul Menu");
    sendSlackMessage(oneulMenu, "oneul");
  }

  if (jungbanMenu.length > 0) {
    console.log(":: Send Slack Message - Jungban Menu");
    sendSlackMessage(jungbanMenu, "jungban");
  }

  console.log("::");
  console.groupEnd("");
  console.log("");
}

// 실행
checkSitesFeeds();
