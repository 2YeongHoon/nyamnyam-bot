import { sendSlackMessage } from '../utils/slack.js';
// import { validateHoliday } from "../utils/holiday.js";
import { checkOneul } from "../sites/oneul.js";
import { checkJungban } from "../sites/jungban.js";

export async function checkSitesFeeds() {

  const dateNow = new Date();
  console.group(dateNow.toLocaleString());

  // TODO: 간할적 "SERVICE_KEY_IS_NOT_REGISTERED_ERROR" 에러로 임시 주석처리
  // 오픈API 서버 불안정 추정
  // if(await checkHoliday(dateNow)) return;

  console.log(":: Start Check Oneul Menu");
//   const oneulMenu = await checkOneul();
  const oneulMenu = "https://scontent-gmp1-1.cdninstagram.com/v/t51.29350-15/448722214_990036255921827_2264172774959754992_n.heic?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTMxeDE0MTQuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=R5GUQ7ye60sQ7kNvgFEfjRg&edm=AA24wl0BAAAA&ccb=7-5&ig_cache_key=MzM5Mzc5MDE2MDM2NTM1NDE4MQ%3D%3D.2-ccb7-5&oh=00_AYBwCeR0TvNM_rC94ESeMFTEyZqsRPWbTw_EHPpWhPUwRQ&oe=6677E518&_nc_sid=cf751b";
  console.log(":: End Check Oneul Menu (" + oneulMenu.length + ")");

  console.log(":: Start Check Jungban Menu");   
//   const jungbanMenu = await checkJungban();
  const jungbanMenu = "https://scontent-gmp1-1.cdninstagram.com/v/t51.29350-15/448722214_990036255921827_2264172774959754992_n.heic?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTMxeDE0MTQuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=R5GUQ7ye60sQ7kNvgFEfjRg&edm=AA24wl0BAAAA&ccb=7-5&ig_cache_key=MzM5Mzc5MDE2MDM2NTM1NDE4MQ%3D%3D.2-ccb7-5&oh=00_AYBwCeR0TvNM_rC94ESeMFTEyZqsRPWbTw_EHPpWhPUwRQ&oe=6677E518&_nc_sid=cf751b";
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