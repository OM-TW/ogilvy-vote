import { HomeContext, HomeStepType } from '@/pages/home/config';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import UserAgent, { UserAgentType } from 'lesca-user-agent';

type TStyle = {
  top?: string;
  bottom?: string;
  transform: string;
};

const SCALE_SIZE = 1000;
const SCALE_MIN_SIZE = 0.6;

const Outline = ({ top }: { top?: boolean }) => {
  const [state] = useContext(HomeContext);
  const { step } = state;
  const [style, setStyle] = useTween({ opacity: 0, y: top ? 200 : -200, x: top ? 100 : -100 });

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle(
        { opacity: 1, y: 0 },
        {
          duration: 800,
          easing: Bezier.inOutQuart,
          onEnd: () => {
            setStyle({ x: 0 }, { duration: 500, easing: Bezier.inOutBack });
          },
        },
      );
    }
  }, [step]);

  return (
    <div className='ol' style={style}>
      <div>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='title' style={style} />
        </div>
      </div>
    </div>
  );
};

const BottomLine = () => {
  const [state, setState] = useContext(HomeContext);
  const { step } = state;
  const [style, setStyle] = useTween({ opacity: 0, x: 50 });

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle(
        { opacity: 1, x: 0 },
        {
          duration: 500,
          delay: 1800,
          onEnd: () => {
            setState((S) => ({ ...S, step: HomeStepType.patternIn }));
          },
        },
      );
    }
  }, [step]);

  return <div className='b' style={style} />;
};

const TopLine = () => {
  const [state] = useContext(HomeContext);
  const { step } = state;
  const [style, setStyle] = useTween({ opacity: 0, x: -50 });

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 1500 });
    }
  }, [step]);

  return <div className='t' style={style} />;
};

const Pattern = memo(({ top }: { top?: boolean }) => {
  const [, setState] = useContext(HomeContext);
  const ref = useRef<HTMLParagraphElement>(null);
  const [style, setStyle] = useState<TStyle | undefined>();

  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        const { clientHeight } = ref.current;
        const { innerHeight } = window;
        const mobile = UserAgent.get() === UserAgentType.Mobile;
        const scale: number = mobile
          ? 1
          : Math.max(SCALE_MIN_SIZE, innerHeight < SCALE_SIZE ? innerHeight / SCALE_SIZE : 1);
        const styles: TStyle = {
          transform: innerHeight < SCALE_SIZE ? `scale(${scale})` : 'scale(1)',
        };
        if (top) styles.bottom = `-${clientHeight * 0.5}px`;
        else styles.top = `-${clientHeight * 0.5}px`;

        if (top) setState((S) => ({ ...S, height: clientHeight * scale }));
        setStyle(styles);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={ref} className={twMerge('Pattern', top ? 'nor' : 'inv')} style={style}>
      <div className='text'>
        <div>
          <Outline top={top} />
          <TopLine />
          <BottomLine />
        </div>
      </div>
    </div>
  );
});
export default Pattern;
