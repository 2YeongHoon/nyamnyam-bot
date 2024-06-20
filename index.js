import express from 'express';
import bodyParser from 'body-parser';
import helloController from './server/controller/MenuController.js';

const app = express();
const port = 3000;
app.use(bodyParser.json());

/** 서버 초기 설정 */
export async function initialServerSetting() {

  // 라우터 설정
  app.use('/hello', helloController);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}


initialServerSetting()



