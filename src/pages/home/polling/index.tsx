import { memo, useEffect } from 'react';
import './index.less';
import Background from '@/components/background';

const Polling = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Polling'>
      <Background />
      <div className='dialog'>
        <div className='ctx'>asd</div>
      </div>
    </div>
  );
});
export default Polling;
