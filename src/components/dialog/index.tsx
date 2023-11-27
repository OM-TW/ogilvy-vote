import { IReactProps } from '@/settings/type';
import { memo, useEffect } from 'react';
import './index.less';

const Dialog = ({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return (
    <div className='Dialog'>
      <div className='ctx'>{children}</div>
    </div>
  );
};

Dialog.Body = memo(({ children }: IReactProps) => (
  <div className='flex h-auto w-full flex-1 flex-col items-center justify-center'>{children}</div>
));

Dialog.Top = memo(({ children }: IReactProps) => (
  <div className='relative flex h-56 w-full flex-col items-center justify-between overflow-hidden p-3'>
    {children}
  </div>
));

export default Dialog;
