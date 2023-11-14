import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';
import { REST_PATH } from '../settings/config';
import { Context } from '../settings/constant';
import { ActionType } from '@/settings/type';
import { IRespond } from '../../setting';

export type TResult = IRespond | undefined;
export type TSignInArgument = { extension: string; password: string };

const useSignIn = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<TResult>();
  const fetch = async (parm: TSignInArgument) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const respond = (await Fetcher.post(REST_PATH.signIn, parm)) as IRespond;
    setState(respond);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
  };
  return [state, fetch] as const;
};
export default useSignIn;
