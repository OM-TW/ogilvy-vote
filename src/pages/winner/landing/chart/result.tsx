import { OPEN_DELAY } from '@/settings/config';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Props, WinnerContext, WinnerStepType } from '../../config';
import './result.less';
import CharTransition from 'lesca-react-char-transition';

const DefaultProperty = { opacity: 0, y: 500 };

const Button = ({ data }: Pick<Props, 'data'>) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 100 });

  const className = useMemo(() => {
    if (data) {
      const { status } = data;
      if (status) return 'on';
      return 'off';
    }
    return 'off';
  }, [data]);

  const text = useMemo(() => {
    if (data) {
      const { status } = data;
      if (status) return 'CONGRATULATIONS';
      return 'NEXT';
    }
    return 'NEXT';
  }, [data]);

  useEffect(() => {
    setStyle({ opacity: 1, y: 0 });
  }, []);

  return (
    <button style={style} id='next' className={twMerge('nextButton', className)}>
      <CharTransition duration={800} gap={50}>
        {text}
      </CharTransition>
    </button>
  );
};

const Final = ({ data }: Pick<Props, 'data'>) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 100 });
  const [state] = useContext(WinnerContext);
  const [ticket, setTicket] = useState({ A: 0, B: 0 });
  const { vote } = state;

  const className = useMemo(() => {
    const A = vote.filter((v) => v.vote);
    const B = vote.filter((v) => !v.vote);
    setTicket({ A: A.length, B: B.length });
    if (A >= B) return 'onA';
    else return 'onB';
  }, [vote]);

  useEffect(() => {
    if (data) {
      const { status } = data;
      if (status) setStyle({ opacity: 1, y: 0 }, { delay: OPEN_DELAY });
    }
  }, [data]);

  return (
    <div style={style} className='Final'>
      <div className={className}>
        <div className='t0' />
        <span>{ticket.A}</span>
        <div className='t1' />
        <span>{ticket.B}</span>
        <div className='t2' />
      </div>
    </div>
  );
};

const Result = memo(({ data, step }: Props) => {
  const [, setState] = useContext(WinnerContext);
  const [style, setStyle] = useTween(DefaultProperty);
  const [type, setType] = useState('');

  useEffect(() => {
    if (!data) {
      setStyle(DefaultProperty, 500);
      return;
    }
    if (step === WinnerStepType.Unset) setStyle(DefaultProperty, 500);
    else {
      const { result, status } = data;
      if (!status) return setStyle(DefaultProperty, 500);
      else {
        setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: OPEN_DELAY });

        if (result[step].A > result[step].B) setType('ResultCardA');
        else setType('ResultCardB');
      }
    }
  }, [data, step]);

  useEffect(() => {
    Click.add('#next', () => {
      setState((S) => {
        let { status, step } = S;
        if (step === WinnerStepType.Unset) {
          step = WinnerStepType.Creative;
        } else {
          if (!status) {
            status = true;
          } else {
            status = false;
            const departments = Object.values({ ...WinnerStepType });
            const currentIndex = departments.indexOf(step) + 1;
            if (currentIndex === departments.length) return S;
            else step = departments[currentIndex];
          }
        }
        return { ...S, step, status };
      });
    });
    return () => {
      Click.remove('#next');
    };
  }, []);

  return (
    <div className={twMerge('ResultCard', type)}>
      <div className='w-full'>
        <div style={style} className='text' />
      </div>
      <div className='flex w-full justify-center'>
        {step === WinnerStepType.Total && <Button data={data} />}
      </div>
      <div className='w-full'>{step === WinnerStepType.Total && <Final data={data} />}</div>
    </div>
  );
});
export default Result;
