import useVote, { TVoteArgument } from '@/hooks/useVote';
import { FormEvent, memo, useCallback, useState } from 'react';
import './index.less';
import SchemaTable from './table';

const queryString = `{
  extension: String, // 分機號碼 "338", "200"
  vote: Boolean,     // A方案給true, B方案給false
};`;

const respondBody = `{
  res: Boolean,  // 成功給true, 失敗給false
  msg: String,   // 訊息
  data?: TYPE[]  // 如果有資料會放這邊
}`;

const Vote = memo(() => {
  const [respond, vote] = useVote();
  const [state, setState] = useState<string | undefined>();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries([...new FormData(e.currentTarget)]);
    const currentData: TVoteArgument = {
      extension: String(data.extension) || '',
      vote: data.vote === 'on' ? true : false,
    };

    vote(currentData);
    setState(JSON.stringify(currentData));
  }, []);

  return (
    <div className='mockup-browser w-full border bg-base-300'>
      <div className='mockup-browser-toolbar'>
        <div className='input'>https://ogilvy-vote.netlify.app/api/vote</div>
      </div>
      <div className='flex flex-col items-center justify-center space-y-4 bg-base-100 px-4 py-16'>
        <div className='w-full text-lg text-primary'>Schema</div>
        <SchemaTable {...{ queryString, respondBody }} />
        <div className='w-full text-lg text-secondary'>Workspace</div>
        <form onSubmit={onSubmit}>
          <div className='join'>
            <input
              name='extension'
              className='input join-item input-bordered'
              type='number'
              placeholder='分機'
            />
            <div className='form-control flex flex-row p-1 px-5'>
              <label className='label cursor-pointer'>
                <span className='label-text px-1'>vote(A:true, B:false)</span>
                <input name='vote' type='checkbox' className='checkbox' />
              </label>
            </div>
            <button className='btn join-item rounded-r-full'>投票</button>
          </div>
        </form>
        {state && (
          <div className='form-control w-full' key={state}>
            <label className='label'>
              <span className='label-text'>schema</span>
            </label>
            <textarea
              className='textarea textarea-bordered textarea-secondary h-24'
              placeholder='Bio'
            >
              {state}
            </textarea>
          </div>
        )}
        {respond && (
          <textarea
            key={respond.msg}
            className='textarea textarea-primary w-full'
            placeholder='respond'
            defaultValue={JSON.stringify(respond)}
          />
        )}
      </div>
    </div>
  );
});
export default Vote;
