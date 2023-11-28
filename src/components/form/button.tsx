import { IReactProps } from '@/settings/type';
import { memo } from 'react';

const Button = memo(({ children }: IReactProps) => (
  <div className='buttonContainer'>
    <button type='submit'>{children}</button>
  </div>
));
export default Button;
