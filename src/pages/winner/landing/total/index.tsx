import { memo, useEffect, useMemo } from 'react';
import { Props, WinnerStepType } from '../../config';
import './index.less';
import { twMerge } from 'tailwind-merge';
import useTween from 'lesca-use-tween';
import { OPEN_DELAY } from '@/settings/config';

const Span = ({ value }: { value: string | number }) => {
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (typeof value === 'string') return;
    setStyle({ opacity: value }, value === 0 ? 1000 : OPEN_DELAY);
  }, [value]);

  if (typeof value === 'string') return <span className='mx-1'>??</span>;
  else return <span className='mx-1'>{`${Number(style.opacity).toFixed(1)}%`}</span>;
};

const Total = memo(({ data, step }: Props) => {
  const A = useMemo(() => {
    if (!data) return '??';
    if (step === WinnerStepType.Unset) return '??';
    else {
      const { result, status } = data;
      if (!status) return 0;
      else return result[step].A;
    }
  }, [step, data]);

  const B = useMemo(() => {
    if (!data) return '??';
    if (step === WinnerStepType.Unset) return '??';
    else {
      const { result, status } = data;
      if (!status) return 0;
      else return result[step].B;
    }
  }, [step, data]);

  const className = useMemo(() => {
    if (!data) return ['text-[var(--color-red)]', `border-[var(--color-red)]`];
    if (step === WinnerStepType.Unset)
      return ['text-[var(--color-red)]', `border-[var(--color-red)]`];
    else {
      const { result, status } = data;
      if (!status) return ['text-[var(--color-red)]', `border-[var(--color-red)]`];
      else {
        if (result[step].A > result[step].B)
          return ['text-[var(--color-yellow)]', `border-[var(--color-yellow)]`];
        else return ['text-[var(--color-purple)]', `border-[var(--color-purple)]`];
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
    <div className={twMerge('Total', className[0])}>
      <div className={twMerge(className[1], transitionClassName)}>
        A:
        <Span value={A} />
      </div>
      <div className={twMerge(transitionClassName)}>
        B:
        <Span value={B} />
      </div>
    </div>
  );
});
export default Total;
