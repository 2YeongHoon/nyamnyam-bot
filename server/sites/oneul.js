import { Builder, By, until } from 'selenium-webdriver';
import { load } from "cheerio";
import {config} from "dotenv";

config()
const URL = process.env.ONEUL_URL;
const SELENIUM_URL = process.env.SELENIUM_URL || "http://selenium:4444/wd/hub";  // 환경 변수를 통해 Selenium URL 설정

export async function checkOneul() {
  let driver = await new Builder().forBrowser('chrome').usingServer(SELENIUM_URL).build();
  // let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 특정 URL로 이동합니다.
    await driver.get(URL);

    // 페이지 로딩을 기다립니다.
    await driver.sleep(5000);

    // 페이지 소스를 가져옵니다.
    let pageSource = await driver.getPageSource();

    // cheerio를 사용하여 페이지 소스를 파싱합니다.
    const $ = load(pageSource);

    // 모든 이미지 태그를 찾습니다.
    const imageList = [];
    $('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src) {
        imageList.push(src);
      }
    });

    return imageList[4];
  } finally {
    // 브라우저 종료
    await driver.quit();
  }
}