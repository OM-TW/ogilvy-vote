import mongoose from 'mongoose';
import { messages } from '../config';
import models from '../models';
import { IRespond } from '../../../setting';

type T = { collection: string };

const drop = ({ collection }: T) => {
  return new Promise<IRespond>((resolve) => {
    if (mongoose.connections[0].readyState) {
      try {
        const currentModel = models[collection] as typeof mongoose.Model;
        currentModel.db
          .dropCollection(collection)
          .then((e: unknown) => {
            resolve({ res: true, msg: messages.dropSuccess, data: [e] });
          })
          .catch((e: unknown) => {
            resolve({ res: false, msg: messages.dropError, data: [e] });
          });
      } catch (e: unknown) {
        resolve({ res: false, msg: messages.dropError });
      }
    } else resolve({ res: false, msg: messages.dropError });
  });
};
export default drop;
