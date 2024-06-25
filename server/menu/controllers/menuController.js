import express from 'express';
import { checkSitesFeeds } from '../services/menuService.js';
import { checkHoliday } from '../../external/holiday/holiday.js';

const router = express.Router()

router.get('/', (req, res) => {
  const dateNow = new Date();
  console.group(dateNow.toLocaleString());

  // if(checkHoliday(dateNow)) {
  //   res.send("fail");
  //   return;
  // }
  checkSitesFeeds();
  res.send('ok');
});

export default router