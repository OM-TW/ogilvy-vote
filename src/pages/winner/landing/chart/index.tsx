import CharTransition from 'lesca-react-char-transition';
import { memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Props, WinnerStepType } from '../../config';
import Total from '../total';
import Canvas from './canvas';
import './index.less';
import Result from './result';

const Chart = memo((props: Props) => {
  const { data, step } = props;

  const interText = useMemo(() => {
    if (!data) return 'Result';
    else {
      return step;
    }
  }, [data, step]);

  const className = useMemo(() => {
    if (!data) return 'text-[var(--color-red)]';
    if (step === WinnerStepType.Unset) return 'text-[var(--color-red)]';
    else {
      const { result, status } = data;
      if (!status) return 'text-[var(--color-red)]';
      else {
        if (result[step].A > result[step].B) return 'text-[var(--color-yellow)]';
        else return 'text-[var(--color-purple)]';
      }
    }
  }, [data, step]);

  const transitionClassName = useMemo(() => {
    if (!data) return '';
    if (step === WinnerStepType.Unset) return '';
    else {
      const { result, status } = data;
      if (!status) return '';
      else {
        if (result[step].A > result[step].B) return 'transitionTime';
        else return 'transitionTime';
      }
    }
  }, [data, step]);

  return (
    <div className='Chart'>
      <div className={twMerge('title', className, transitionClassName)}>
        <CharTransition duration={800} gap={10} preChar='?'>
          {interText}
        </CharTransition>
      </div>
      <div className='ctx'>
        <Canvas {...props} />
      </div>
      <Total {...props} />
      <Result {...props} />
    </div>
  );
});
export default Chart;
