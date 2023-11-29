import { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { Props, WinnerContext, WinnerStepType } from '../config';
import Chart from './chart';
import './index.less';
import { WinnerSorting } from './misc';
import Dolls from './dolls';
import { OPEN_DELAY } from '@/settings/config';

const Background = ({ data, step }: Props) => {
  const className = useMemo(() => {
    const classes = ['absolute left-0 top-0 h-full w-full'];
    if (step === WinnerStepType.Unset) return classes.join(' ');
    if (data) {
      if (!data.status) return classes.join(' ');
      if (data.result[step].A > data.result[step].B) {
        classes.push('bg-[var(--color-purple)] transitionTime');
      } else {
        classes.push('bg-[var(--color-yellow)] transitionTime');
      }
    }
    return classes.join(' ');
  }, [data, step]);
  return <div className={className} />;
};

const Landing = memo(() => {
  const [state, setState] = useContext(WinnerContext);
  const { user, vote, step, status } = state;
  const proof = useRef({ status: true });

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === ' ') {
        if (!proof.current.status) return;
        proof.current.status = false;

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
          setTimeout(
            () => {
              proof.current.status = true;
            },
            status ? OPEN_DELAY + 1000 : 1000,
          );

          return { ...S, step, status };
        });
      }
    };
    window.addEventListener('keydown', keydown);
  }, []);

  const data = useMemo(() => {
    if (user.length && vote.length) {
      const result = WinnerSorting({ vote, user });
      return { result, status };
    }
    return false;
  }, [user, vote, status]);

  return (
    <div className='Landing'>
      <Dolls data={data} step={step} />
      <Background data={data} step={step} />
      <Chart data={data} step={step} />
    </div>
  );
});
export default Landing;
