import axios from "axios";
import {config} from "dotenv";

config()

console.log('[ENV!!!]',process.env)
console.log('[ENV!!!]',process.env.OPEN_API_HOLIDAY_SERVICE_KEY)
console.log('[ENV!!!]',process.env.OPEN_API_HOLIDAY_URL)
const SERVICE_KEY = process.env.OPEN_API_HOLIDAY_SERVICE_KEY;
const URL = process.env.OPEN_API_HOLIDAY_URL;

const ZERO_BASE_MONTH = 1;
const DATE_PREFIX = "0";
const MAX_PARAMETER_SIZE = 50;

export default async function (date) {
    return await isHoliday(date);  
}

async function isHoliday(date) {
    const nowYear = date.getFullYear();
    const nowMonth = (date.getMonth() + ZERO_BASE_MONTH).toString().padStart(2, DATE_PREFIX);
    const nowDay = date.getDate().toString().padStart(2, DATE_PREFIX);
    const nowDate = (nowYear + nowMonth + nowDay).toString();

    const result = await sendRequest(nowYear);
    const holidayList = result?.response?.body;

    // 결과값 에러
    if(!holidayList){
        console.log("공휴일 정보를 가져올 수 없음");
        return true;
    } 

    // 공휴일 여부 체크
    if(holidayList.items.item.some(item => item.locdate.toString() === nowDate)){
      console.log("Today is Holiday");
      return true;
    }
    return false;
}

// API 요청 전송
async function sendRequest(year) {
  console.log("sendRequest Start ", "year: ", year);

const params = {
  solYear: year,
  numOfRows: MAX_PARAMETER_SIZE,
  ServiceKey: SERVICE_KEY
};

  try {
    const result = (await axios.get(URL, { params })).data;
    return result;
  } catch (error) {
    console.groupCollapsed("Holiday API Send Failed");
    console.error(error);
    console.groupEnd();
  }
}
