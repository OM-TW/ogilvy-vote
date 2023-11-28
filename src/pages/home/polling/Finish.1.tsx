import { memo, useEffect } from 'react';

export const Finish = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Finish'>
      <div className='w-full px-[15%]'>
        <div className='title' />
      </div>
      <div className='w-full px-[19%]'>
        <div className='time'></div>
      </div>
    </div>
  );
});
