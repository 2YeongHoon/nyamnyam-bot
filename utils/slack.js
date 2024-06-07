import axios from "axios";

const url = "https://slack.com/api/chat.postMessage";
const token = "";
const bearer = "Bearer " + token;

/**
 * 슬랙 템플릿별 메시지 전송
 * @param { object[] } feedList 외주 피드
 * @param { 'oneul' } template 템플릿 형식
 */
export default async function (feed, template) {
  if (template === "oneul") {
    sendMessage(templateOneul(feed));
  }
}

/**
 * 오늘식당 메시지 템플릿
 * @param { OneulFeed } feed
 * @returns { any[] }
 */
function templateOneul(feed) {
  return [
    {
      image_url: feed,
      text: "오늘식당",
      pretext: "오늘식당 메뉴"
    }
  ];
}

// 슬랙 메시지 전송
async function sendMessage(message) {
  console.log("sendMessage Start", message);
  const params = {
    channel: "",
    attachments: message,
  };

  try {
    const result = await axios.post(url, params, { headers: { Authorization: bearer } });
    console.log('[result]', result)
  } catch (error) {
    console.groupCollapsed("Slack Message Send Failed");
    console.error(error);
    console.groupEnd();
  }
}
