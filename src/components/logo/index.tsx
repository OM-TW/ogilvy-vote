import { memo } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';

const Logo = memo(({ className = 'absolute left-5 top-5' }: { className?: string }) => (
  <div className={twMerge('Logo', className)} />
));
export default Logo;
