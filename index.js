import fs from "fs";
import path from "path";
import sendSlackMessage from "./utils/slack.js";
import validateHoliday from "./utils/holiday.js";
import checkOneul from "./sites/oneul.js";
import checkJungban from "./sites/jungban.js";

async function checkSitesFeeds() {

  const dateNow = new Date();
  console.group(dateNow.toLocaleString());

  if(await checkHoliday(dateNow)) return;

  console.log(":: Start Check Oneul Menu");
  const oneulMenu = await checkOneul();
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
