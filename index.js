import express from 'express';
import bodyParser from 'body-parser';
import menuController from './server/menu/controllers/menuController.js';
// import foodController from './server/food/controllers/foodController.js';

const app = express();
const port = 3000;
app.use(bodyParser.json());

/** 서버 초기 설정 */
export async function initialServerSetting() {

  // 메뉴 API
  app.use('/menus', menuController);

  // // 음식추천 API
  // app.use('/foods', foodController);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

initialServerSetting()



