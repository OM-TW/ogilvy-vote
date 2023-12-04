import useSelect from '@/hooks/useSelect';
import { memo, useEffect, useState } from 'react';
import { TUser, TVote, TYPE } from '../../../setting';
import { WinnerContext, WinnerState } from './config';
import './index.less';
import Landing from './landing';

const Winner = memo(() => {
  const value = useState(WinnerState);
  const [, setState] = value;
  const [respond, getUsers] = useSelect();

  useEffect(() => {
    getUsers({ collection: 'user' });
  }, []);

  useEffect(() => {
    if (respond) {
      if (respond.data) {
        const data: Exclude<TYPE, { vote: boolean }>[] = respond.data;
        const [currentData] = data;

        if (data.length === 0) {
          alert('資料庫沒有任何資料');
          return;
        }

        if (currentData.name) {
          const user = respond.data as TUser[];
          setState((S) => ({ ...S, user }));
          getUsers({ collection: 'vote' });
        } else {
          const vote = respond.data as TVote[];
          setState((S) => ({ ...S, vote }));
        }
      }
    }
  }, [respond]);

  return (
    <WinnerContext.Provider value={value}>
      <div className='Winner'>
        <Landing />
      </div>
    </WinnerContext.Provider>
  );
});
export default Winner;
