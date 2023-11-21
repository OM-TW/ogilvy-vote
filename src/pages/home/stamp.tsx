import { memo, useContext, useEffect } from 'react';
import { HomeContext, HomeStepType } from './config';
import './stamp.less';
import useTween from 'lesca-use-tween';

const Symbol = () => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 3 });
  const [state] = useContext(HomeContext);
  const { step } = state;
  useEffect(() => {
    if (step === HomeStepType.patternIn) {
      setStyle({ opacity: 1, scale: 1 }, 300);
    }
  }, [step]);
  return <div className='symbol' style={style} />;
};

const VoteDate = () => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [state] = useContext(HomeContext);
  const { step } = state;
  useEffect(() => {
    if (step === HomeStepType.patternIn) {
      setStyle({ opacity: 1, y: 0 }, { delay: 300, duration: 500 });
    }
  }, [step]);
  return (
    <div
      style={style}
      className='relative -mt-3 rounded-xl border-2 border-[var(--color-purple)] bg-[var(--color-yellow)] px-2 py-0 text-3xl tracking-wide text-[var(--color-purple)]'
    >
      11/30 9:00
    </div>
  );
};

const Text = () => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [state, setState] = useContext(HomeContext);
  const { step } = state;
  useEffect(() => {
    if (step === HomeStepType.patternIn) {
      setStyle(
        { opacity: 1, y: 0 },
        {
          delay: 400,
          duration: 500,
          onEnd: () => {
            setState((S) => ({ ...S, step: HomeStepType.topicIn }));
          },
        },
      );
    }
  }, [step]);
  return <div className='text' style={style} />;
};

const Stamp = memo(() => (
  <div className='Stamp'>
    <Symbol />
    <VoteDate />
    <Text />
  </div>
));
export default Stamp;
