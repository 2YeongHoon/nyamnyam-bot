import express from 'express';
import { checkSitesFeeds } from '../service/SlackService.js';
import { checkHoliday } from '../utils/holiday.js';

const router = express.Router()

router.get('/', (req, res) => {
  const dateNow = new Date();
  console.group(dateNow.toLocaleString());

  if(checkHoliday(dateNow)) {
    res.send("fail");
    return;
  }
  checkSitesFeeds();
  res.send('ok');
});

export default router