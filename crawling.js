import { Builder, By, until } from 'selenium-webdriver';
import { load } from "cheerio";

async function fetchPage() {
  // 브라우저 드라이버를 설정합니다 (Chrome 사용).
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 특정 URL로 이동합니다.
    await driver.get('https://www.instagram.com/oneul_sikdang/');  // 여기에 대상 URL을 입력하세요.

    // 페이지 로딩을 기다립니다.
    await driver.sleep(5000);  // 필요에 따라 조정

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

    console.log(imageList[4]);
  } finally {
    // 브라우저를 종료합니다.
    await driver.quit();
  }
}

fetchPage();