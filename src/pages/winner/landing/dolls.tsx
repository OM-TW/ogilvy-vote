import { memo, useEffect, useMemo } from 'react';
import { Props, WinnerStepType } from '../config';
import './dolls.less';
import useTween from 'lesca-use-tween';
import { OPEN_DELAY } from '@/settings/config';

const Doll = ({ status, index }: { status: boolean; index: number }) => {
  const [style, setStyle] = useTween({ opacity: 1, y: window.innerHeight });

  useEffect(() => {
    if (status) setStyle({ y: 0 }, { delay: OPEN_DELAY + index * 50, duration: 1000 });
    else setStyle({ y: window.innerHeight }, 500);
  }, [status]);

  return <div style={style} />;
};

const Dolls = memo(({ data, step }: Props) => {
  const status = useMemo(() => {
    if (step === WinnerStepType.Unset) return false;
    if (data) {
      if (!data.status) return false;
      else return true;
    }
    return false;
  }, [data, step]);

  return (
    <div className='Dolls'>
      <Doll status={status} index={0} />
      <Doll status={status} index={1} />
    </div>
  );
});
export default Dolls;
