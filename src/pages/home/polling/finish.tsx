import { memo, useEffect, useState } from 'react';
import './finish.less';
import OnloadProvider from 'lesca-react-onload';
import { TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';

const Time = ({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 100 });
    }
  }, [transition]);
  return (
    <div className='w-full px-[19%]' style={style}>
      <div className='time'>
        <div className='text' />
      </div>
    </div>
  );
};

const Title = ({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, 500);
    }
  }, [transition]);
  return (
    <div style={style} className='w-full px-[15%]'>
      <div className='title' />
    </div>
  );
};

const Finish = memo(() => {
  const [transition, setTransition] = useState<TransitionType>(TransitionType.Unset);
  return (
    <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
      <div className='Finish'>
        <Title transition={transition} />
        <Time transition={transition} />
      </div>
    </OnloadProvider>
  );
});
export default Finish;
