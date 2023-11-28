import { TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { useEffect } from 'react';

export const CardB = ({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 3 });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, scale: 1 }, 400);
    }
  }, [transition]);
  return (
    <div
      style={style}
      className='flex w-full flex-col items-center justify-start rounded-2xl border-2 border-[var(--color-purple)] bg-[var(--color-yellow)] p-8'
    >
      <div className='w-full px-[32%]'>
        <div className='t0 bg-[var(--color-purple)]' />
      </div>
      <div className='my-[14%] w-full px-[25%] sm:px-[25%]'>
        <div className='t-b' />
      </div>
      <div className='w-full px-[20%] sm:px-[20%]'>
        <div className='t-b-t' />
      </div>
    </div>
  );
};

export const CardA = ({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 3 });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, scale: 1 }, 400);
    }
  }, [transition]);
  return (
    <div
      style={style}
      className='flex w-full flex-col items-center justify-start rounded-2xl border-2 border-[var(--color-yellow)] bg-[var(--color-purple)] p-8'
    >
      <div className='w-full px-[32%]'>
        <div className='t0 bg-[var(--color-yellow)]' />
      </div>
      <div className='my-[14%] w-full px-[25%] sm:px-[25%]'>
        <div className='t-a' />
      </div>
      <div className='w-full px-[20%] sm:px-[20%]'>
        <div className='t-a-t' />
      </div>
    </div>
  );
};

export const Back = ({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, x: 100 });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, x: 0 }, { duration: 400, delay: 1000 });
    }
  }, [transition]);
  return (
    <button style={style} id='back' className='back'>
      <div className='arrow' />
      <div className='text' />
    </button>
  );
};

export const Button = ({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 100 });
  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 400, delay: 300 });
    }
  }, [transition]);
  return (
    <div style={style} className='mt-10 flex w-full justify-center'>
      <button id='ok' className='conform-ok'>
        <div className='text' />
      </button>
    </div>
  );
};
