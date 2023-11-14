import useVote, { TVoteArgument } from '@/hooks/useVote';
import { FormEvent, memo, useCallback } from 'react';
import './index.less';

const Vote = memo(() => {
  const [respond, vote] = useVote();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries([...new FormData(e.currentTarget)]);
    const currentData: TVoteArgument = {
      extension: String(data.extension) || '',
      vote: data.vote === 'on' ? true : false,
    };

    vote(currentData);
  }, []);

  return (
    <div className='mockup-browser border bg-base-300 w-full'>
      <div className='mockup-browser-toolbar'>
        <div className='input'>/api/vote</div>
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
            <div className='form-control flex flex-row p-1 px-5'>
              <label className='label cursor-pointer'>
                <span className='label-text px-1'>vote(A:true, B:false)</span>
                <input name='vote' type='checkbox' className='checkbox' />
              </label>
            </div>
            <button className='btn join-item rounded-r-full'>投票</button>
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
export default Vote;
