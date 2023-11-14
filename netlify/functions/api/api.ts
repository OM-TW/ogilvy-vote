import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import serverless from 'serverless-http';
import connect from './connect';
import select from './select';
import insert from './insert';
import deleteOne from './delete';
import update from './update';
import { SETTING } from '../../../setting';
import { customMessage } from '../config';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const api = express();

api.use(cors({ origin: '*' }));
api.use(express.json());

const router = Router();

router.post('/login', (req, res) => {
  const { body } = req;
  const { USERNAME = 'admin', PASSWORD = '1234' } = process.env;
  if (body.username === USERNAME && body.password === PASSWORD) {
    res.status(200).json({ res: true, msg: 'login success', data: body });
  } else res.status(200).json({ res: false, msg: 'username or password incorrect.' });
});

router.get('/connect', async (_, res) => {
  const respond = await connect();
  res.status(200).json(respond);
});

router.post('/select', async (req, res) => {
  const respond = await select(req.body);
  res.status(200).json(respond);
});

router.post('/insert', async (req, res) => {
  const respond = await insert(req.body);
  res.status(200).json(respond);
});

router.post('/delete', async (req, res) => {
  const respond = await deleteOne(req.body);
  res.status(200).json(respond);
});

router.post('/update', async (req, res) => {
  const respond = await update(req.body);
  res.status(200).json(respond);
});

router.post('/check', async (req, res) => {
  const respond = await select({ collection: SETTING.mongodb[0].collection });
  if (respond.res) {
    if (respond.data) {
      const { body } = req;
      const data = respond.data.filter((data) => data.extension === body.extension);
      if (!data) res.status(200).json({ res: false, msg: customMessage.extensionNotFound });
      else {
        const voteRespond = await select({ collection: SETTING.mongodb[1].collection });
        if (respond.res) {
          if (!voteRespond.data) {
            res.status(200).json({ res: false, msg: customMessage.extensionNotVote });
          } else {
            const [checkVote] = voteRespond.data.filter((each) => {
              each.extension === data[0].extension;
            });
            if (!checkVote) {
              res.status(200).json({ res: false, msg: customMessage.extensionNotVote });
            } else res.status(200).json({ res: false, msg: customMessage.extensionNotVote });
          }
        }
      }
    }
  }
});

api.use('/api/', router);

export const handler = serverless(api);
