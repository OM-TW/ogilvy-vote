import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import serverless from 'serverless-http';
import { SETTING } from '../../../setting';
import { customMessage, messages } from '../config';
import connect from './connect';
import deleteOne from './delete';
import insert from './insert';
import select from './select';
import update from './update';
import { checkIsVote } from './misc';

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
  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const respond = await select(req.body);
    res.status(200).json(respond);
  }
});

router.post('/insert', async (req, res) => {
  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const respond = await insert(req.body);
    res.status(200).json(respond);
  }
});

router.post('/delete', async (req, res) => {
  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const respond = await deleteOne(req.body);
    res.status(200).json(respond);
  }
});

router.post('/update', async (req, res) => {
  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const respond = await update(req.body);
    res.status(200).json(respond);
  }
});

router.post('/check', async (req, res) => {
  if (!req.body) {
    res.status(200).json({ res: false, msg: customMessage.無參數帶入, data: [{ req }] });
    return;
  }

  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const respond = await select({ collection: SETTING.mongodb[0].collection });
    res.status(200).json(await checkIsVote(respond, req));
  }
});

router.post('/signIn', async (req, res) => {
  if (!req.body) {
    res.status(200).json({ res: false, msg: customMessage.無參數帶入, data: [{ req }] });
    return;
  }

  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const respond = await select({ collection: SETTING.mongodb[0].collection });
    if (respond.res) {
      if (respond.data) {
        const { body } = req;
        const [user] = respond.data.filter((user) => user.extension === body.extension);
        if (user) {
          const { userID } = user;
          const password = userID.substr(String(userID).length - 4);
          if (body.password === password) {
            res.status(200).json({ res: true, msg: customMessage.登入成功, data: [body] });
          } else res.status(200).json({ res: false, msg: customMessage.密碼錯誤 });
        } else {
          res
            .status(200)
            .json({ res: false, msg: customMessage.查無分機資料, data: [{ body, user }] });
        }
      } else res.status(200).json({ res: false, msg: customMessage.登入失敗 });
    } else res.status(200).json({ res: false, msg: customMessage.登入失敗 });
  }
});

router.post('/vote', async (req, res) => {
  if (!req.body) {
    res.status(200).json({ res: false, msg: customMessage.無參數帶入, data: [{ req }] });
    return;
  }
  const connection = await connect();
  if (!connection.res) {
    res.status(200).json({ res: false, msg: messages.connectError });
  } else {
    const { body } = req;
    if (body.extension && body.vote !== undefined) {
      const { collection } = SETTING.mongodb[1];
      const voteRespond = await select({ collection });
      if (voteRespond.res) {
        if (voteRespond.data) {
          const [vote] = voteRespond.data.filter((vote) => vote.extension === body.extension);
          if (vote) res.status(200).json({ res: false, msg: customMessage.已投票 });
          else {
            const insertRespond = await insert({ collection, data: body });
            if (insertRespond.res) {
              res.status(200).json({ res: true, msg: customMessage.投票成功 });
            } else res.status(200).json({ res: false, msg: customMessage.投票失敗 });
          }
        } else res.status(200).json({ res: false, msg: customMessage.投票失敗 });
      } else res.status(200).json({ res: false, msg: customMessage.投票失敗 });
    } else res.status(200).json({ res: false, msg: customMessage.投票遺失資料 });
  }
});

api.use('/api/', router);

export const handler = serverless(api);
