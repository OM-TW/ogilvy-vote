import { HomeContext } from '@/pages/home/config';
import { IReactProps } from '@/settings/type';
import { memo, useContext } from 'react';

const Section = memo(({ children, top }: IReactProps & { top?: boolean }) => {
  const [state] = useContext(HomeContext);
  const { height } = state;

  return (
    <section
      className='relative flex h-1/2 w-full flex-col items-center justify-center overflow-hidden'
      style={top ? { paddingBottom: `${height * 0.3}px` } : { paddingTop: `${height * 0.3}px` }}
    >
      {children}
    </section>
  );
});
export default Section;
