//cors 우회 프록시 서버 URL
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// 수집 대상 URL
const url =
  "https://www.instagram.com/oneul_sikdang/";
// 크롤링 함수
async function crawl(url) {
  // 수집중인 URL
  const decodedUrl = decodeURI(url);
  console.log(`크롤링 ${decodedUrl} ...`);
  // URL에서 데이터를 가져옴
  const response = await fetch(url, {
    // headers: {
    //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    //     'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    // }
  });
  // 응답 데이터를 문자열로 변환
  const htmlString = await response.text();
  // HTML 문자열을 파싱하여 DOM 객체 생성
    const parser = new DOMParser();
  //   const htmlDOM = parser.parseFromString(htmlString, "text/html");
  // 데이터 추출
  //   const title = htmlDOM.querySelector("title").textContent;
  //   // 페이지내의 텍스트만 가져오기
  //   const content = htmlDOM.querySelector("#mw-content-text").textContent;
  //   // 추출한 데이터에서 연속된 개행 문자를 하나의 공백으로 대체
  //   const contentWithSingleNewlines = content.replace(/\n{2,}/g, "\n");
  //   console.log(`Title: ${title}\nContent: ${contentWithSingleNewlines}\n`);
  console.log("[htmlDOM]", htmlString);
}
// 실행
crawl(url)
  .then(() => {
    console.log("데이터 수집 완료");
  })
  .catch((err) => console.error(err));
