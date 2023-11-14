import useCheck, { TCheckArgument } from '@/hooks/useCheck';
import { FormEvent, memo, useCallback, useState } from 'react';
import './index.less';
import SchemaTable from './table';

const queryString = `{
  extension: String, // 分機號碼 "338", "200"
};`;

const respondBody = `{
  res: Boolean,  // 成功給true, 失敗給false
  msg: String,   // 訊息
  data?: TYPE[]  // 如果有資料會放這邊
}`;

const Check = memo(() => {
  const [respond, checkOne] = useCheck();
  const [state, setState] = useState<string | undefined>();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries([...new FormData(e.currentTarget)]) as TCheckArgument;
    checkOne(data);
    setState(JSON.stringify(data));
  }, []);

  return (
    <div className='mockup-browser border bg-base-300 w-full'>
      <div className='mockup-browser-toolbar'>
        <div className='input'>https://ogilvy-vote.netlify.app/api/check</div>
      </div>
      <div className='flex justify-center px-4 py-16 flex-col items-center bg-base-100 space-y-4'>
        <div className='w-full text-lg text-primary'>Schema</div>
        <SchemaTable {...{ queryString, respondBody }} />
        <div className='w-full text-lg text-secondary'>Workspace</div>
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
        {state && (
          <div className='form-control w-full' key={state}>
            <label className='label'>
              <span className='label-text'>schema</span>
            </label>
            <textarea className='textarea textarea-bordered h-24' placeholder='Bio'>
              {state}
            </textarea>
          </div>
        )}
        {respond && (
          <>
            <textarea
              key={respond.msg}
              className='textarea w-full textarea-primary'
              placeholder='respond'
              defaultValue={JSON.stringify(respond)}
            />
          </>
        )}
      </div>
    </div>
  );
});
export default Check;
