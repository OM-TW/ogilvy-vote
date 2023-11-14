import { memo } from 'react';
import Check from './check';
import './index.less';
import SignIn from './signIn';
import Vote from './vote';

const Test = memo(() => {
  return (
    <div className='Todo'>
      <Check />
      <SignIn />
      <Vote />
    </div>
  );
});
export default Test;
