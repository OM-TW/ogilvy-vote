import { IRespond, SETTING } from '../../../setting';
import { customMessage } from '../config';
import select from './select';

export const checkIsVote = async (respond: IRespond, req) => {
  if (respond.res) {
    if (respond.data) {
      const { body = '00000' } = req;
      const data = respond.data.filter((data) => data.extension === body.extension);
      if (!data) return { res: false, msg: customMessage.無該分機 };
      else {
        const voteRespond = await select({ collection: SETTING.mongodb[1].collection });
        if (respond.res) {
          if (voteRespond.data) {
            const [checkVote] = voteRespond.data.filter(
              (each) => each.extension === body.extension,
            );
            if (!checkVote) {
              return { res: true, msg: customMessage.未投票 };
            } else return { res: false, msg: customMessage.已投票 };
          } else return { res: false, msg: customMessage.分機檢查失敗 };
        } else return { res: false, msg: customMessage.分機檢查失敗 };
      }
    } else return { res: false, msg: customMessage.分機檢查失敗 };
  } else return { res: false, msg: customMessage.分機檢查失敗 };
};
