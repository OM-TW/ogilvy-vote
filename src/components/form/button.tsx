import { memo, useEffect } from 'react';
import { IReactProps } from '@/settings/type';

const Button = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return (
    <div className='buttonContainer'>
      <button type='submit'>{children}</button>
    </div>
  );
});
export default Button;
