import { memo, useEffect } from 'react';
import './index.less';

const Stamp = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Stamps'>
      <div className='square' />
    </div>
  );
});
export default Stamp;
