import fs from "fs";
import path from "path";
import sendSlackMessage from "./utils/slack.js";
import validateHoliday from "./utils/holiday.js";
import checkOneul from "./sites/oneul.js";
import checkJungban from "./sites/jungban.js";

async function checkSitesFeeds() {

  const dateNow = new Date();
  console.group(dateNow.toLocaleString());

  // TODO: 간할적 "SERVICE_KEY_IS_NOT_REGISTERED_ERROR" 에러로 임시 주석처리
  // 오픈API 서버 불안정 추정
  // if(await checkHoliday(dateNow)) return;

  console.log(":: Start Check Oneul Menu");
  const oneulMenu = await checkOneul();
  // const oneulMenu = "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/448166969_1424889524893717_1380347787249398248_n.heic?stp=c0.141.1131.1131a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=f60pAflcJa0Q7kNvgFDEPUZ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYC1cBjdxtGO-i80pbvWGhfHCZ77X6XUMHOavPTAci9f2A&oe=666EDA8F&_nc_sid=8b3546";
  console.log(":: End Check Oneul Menu (" + oneulMenu.length + ")");

  console.log(":: Start Check Jungban Menu");
  const jungbanMenu = await checkJungban();
  // const jungbanMenu = "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/448166969_1424889524893717_1380347787249398248_n.heic?stp=c0.141.1131.1131a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=f60pAflcJa0Q7kNvgFDEPUZ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYC1cBjdxtGO-i80pbvWGhfHCZ77X6XUMHOavPTAci9f2A&oe=666EDA8F&_nc_sid=8b3546";
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
}

async function checkHoliday(dateNow) {
  console.log(":: Holiday Check");
  const isHoliday = await validateHoliday(dateNow);
  if(isHoliday){
    console.log("slack message no send!");
  }
  return isHoliday;
}

// 실행
checkSitesFeeds();
