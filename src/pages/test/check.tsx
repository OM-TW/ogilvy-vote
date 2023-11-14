import useCheck, { TCheckArgument } from '@/hooks/useCheck';
import { FormEvent, memo, useCallback } from 'react';
import './index.less';

const Check = memo(() => {
  const [respond, checkOne] = useCheck();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries([...new FormData(e.currentTarget)]) as TCheckArgument;
    checkOne(data);
  }, []);

  return (
    <div className='mockup-browser border bg-base-300 w-full'>
      <div className='mockup-browser-toolbar'>
        <div className='input'>/api/check</div>
      </div>
      <div className='flex justify-center px-4 py-16 flex-col items-center bg-base-100 space-y-4'>
        <form onSubmit={onSubmit}>
          <div className='join'>
            <input
              name='extension'
              className='input input-bordered join-item'
              type='number'
              placeholder='分機'
            />
            <button className='btn join-item rounded-r-full'>查詢</button>
          </div>
        </form>
        {respond && (
          <textarea
            key={respond.msg}
            className='textarea w-full textarea-primary'
            placeholder='respond'
            defaultValue={JSON.stringify(respond)}
          />
        )}
      </div>
    </div>
  );
});
export default Check;
