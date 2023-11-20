import { TEASER_DATE } from '@/settings/config';
import { Pad } from 'lesca-number';
import { useCountdown } from 'lesca-use-countdown';
import useTween from 'lesca-use-tween';
import { Fragment, memo, useContext, useEffect } from 'react';
import { HomeContext, HomeStepType } from './config';
import './countdown.less';

const Unit = [<div className='day' />, <span>:</span>, <span>:</span>, ''];

const Text = () => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [state] = useContext(HomeContext);
  const { step } = state;
  useEffect(() => {
    if (step === HomeStepType.patternIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 500 });
    }
  }, [step]);
  return <div className='text' style={style} />;
};

const Clock = () => {
  const [date] = useCountdown(TEASER_DATE);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [state] = useContext(HomeContext);
  const { step } = state;
  useEffect(() => {
    if (step === HomeStepType.patternIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 600 });
    }
  }, [step]);
  return (
    <div className='clock' style={style}>
      {date.map((each, index) => {
        return (
          <Fragment key={`clock${index}`}>
            {Pad(each, 2)} {Unit[index]}
          </Fragment>
        );
      })}
    </div>
  );
};

const Countdown = memo(() => (
  <div className='Countdown'>
    <Text />
    <Clock />
  </div>
));
export default Countdown;
