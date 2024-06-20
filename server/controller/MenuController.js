import express from 'express';
import { checkSitesFeeds } from '../service/SlackService.js';

const router = express.Router()

router.get('/', (req, res) => {
  checkSitesFeeds();
  res.send('ok');
});

export default router