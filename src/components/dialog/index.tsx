import { IReactProps, TransitionType } from '@/settings/type';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useEffect, useRef } from 'react';
import './index.less';

const Dialog = ({ children, transition }: IReactProps & { transition: TransitionType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useTween({ y: -window.innerHeight });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle(
        { y: 0 },
        {
          duration: 800,
          easing: Bezier.outCirc,
          onEnd: () => {
            ref.current?.classList.add('shadow');
          },
        },
      );
    }
  }, [transition]);
  return (
    <div className='Dialog' style={style}>
      <div ref={ref} className='ctx'>
        {children}
      </div>
    </div>
  );
};

Dialog.Body = memo(({ children }: IReactProps) => (
  <div className='flex h-auto w-full flex-1 flex-col items-center justify-center'>{children}</div>
));

Dialog.Top = memo(({ children }: IReactProps) => (
  <div className='relative flex h-52 min-h-[200px] w-full flex-col items-center justify-between overflow-hidden p-3'>
    {children}
  </div>
));

export default Dialog;
