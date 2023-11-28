import { TransitionType } from '@/settings/type';
import Click from 'lesca-click';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { PollingContext, PollingOptionType, PollingStepType } from './config';
import './vote.less';

type Props = {
  className: string;
  id: string;
  transition: TransitionType;
};

const Ticket = memo(({ className, id, transition }: Props) => {
  const [style, setStyle] = useTween({
    x: id === 'a' ? -window.innerWidth : window.innerWidth,
  });
  const [, setState] = useContext(PollingContext);

  useEffect(() => {
    Click.add('#' + id, () => {
      let option = PollingOptionType.A;
      if (id === 'b') option = PollingOptionType.B;
      setState((S) => ({ ...S, step: PollingStepType.conform, option }));
    });
  }, []);

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ x: 0 }, { duration: 500 });
    }
  }, [transition]);

  return (
    <button
      id={id}
      className={twMerge(
        'ticket flex w-full max-w-md flex-row items-center rounded-2xl border-2 p-5',
        className,
      )}
      style={style}
    >
      <div className='w-[37%] px-[6%]'>
        <div className='type' />
      </div>
      <div className='flex flex-1 px-3'>
        <div className='text' />
      </div>
    </button>
  );
});

const Vote = memo(() => {
  const [transition, setTransition] = useState(TransitionType.Unset);
  return (
    <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
      <div className='Vote flex w-full flex-col items-center justify-start space-y-4 p-5'>
        <Ticket className='a' id='a' transition={transition} />
        <Ticket className='b' id='b' transition={transition} />
      </div>
    </OnloadProvider>
  );
});
export default Vote;
