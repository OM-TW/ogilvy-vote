import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';
import { REST_PATH } from '../settings/config';
import { Context } from '../settings/constant';
import { ActionType } from '@/settings/type';
import { IRespond } from '../../setting';

export type TVoteArgument = { extension: string; vote: boolean };
const useVote = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<IRespond | undefined>();
  const fetch = async (parm: TVoteArgument) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const respond = (await Fetcher.post(REST_PATH.vote, parm)) as IRespond;
    setState(respond);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
  };
  return [state, fetch] as const;
};
export default useVote;

const useVoteMany = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<IRespond | undefined>();
  const fetch = async (parm: TVoteArgument[]) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const respond = (await Fetcher.post(REST_PATH.insertMany, {
      collection: 'vote',
      data: parm,
    })) as IRespond;
    setState(respond);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
  };
  return [state, fetch] as const;
};
export { useVoteMany };
