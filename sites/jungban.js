import { Builder, By, until } from 'selenium-webdriver';
import { load } from "cheerio";

export default async function checkJungban() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 특정 URL로 이동합니다.
    await driver.get('https://pcmap.place.naver.com/restaurant/1671594903/feed');

    // 페이지 로딩을 기다립니다.
    await driver.sleep(3000);

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

    // 가져온 이미지리스트 중 6번째 이미지 선택
    return imageList[6];
  } finally {
    // 브라우저를 종료합니다.
    await driver.quit();
  }
}