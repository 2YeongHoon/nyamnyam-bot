import axios from "axios";
import {config} from "dotenv";

config()

const URL = process.env.SLACK_API_URL;
const TOKEN = process.env.SLACK_API_TOKEN;
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;
const BEARER = "Bearer " + TOKEN;

/**
 * 슬랙 템플릿별 메시지 전송
 * @param { object[] } menu 메뉴 이미지
 * @param { 'oneul' } template 템플릿 형식
 */
export default async function (menu, template) {
  if (template === "oneul") {
    sendMessage(templateOneul(menu));
  }

  if (template === "jungban") {
    sendMessage(templateJungban(menu));
  }
}

/**
 * 오늘식당 메시지 템플릿
 * @param { OneulMenu } menu
 * @returns { any[] }
 */
function templateOneul(menu) {
  return [
    {
      image_url: menu,
      text: "오늘식당",
      pretext: "오늘식당 메뉴"
    }
  ];
}

/**
 * 정반식당 메시지 템플릿
 * @param { JungbanMenu } menu
 * @returns { any[] }
 */
function templateJungban(menu) {
  return [
    {
      image_url: menu,
      text: "정반식당",
      pretext: "정반식당 메뉴"
    }
  ];
}

// 슬랙 메시지 전송
async function sendMessage(message) {
  console.log("sendMessage Start", message);
  const params = {
    channel: CHANNEL_ID,
    attachments: message,
  };

  try {
    const result = await axios.post(URL, params, { headers: { Authorization: BEARER } });
    console.log('[result]', result)
  } catch (error) {
    console.groupCollapsed("Slack Message Send Failed");
    console.error(error);
    console.groupEnd();
  }
}
