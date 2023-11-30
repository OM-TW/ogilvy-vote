import { memo, useEffect, useMemo, useRef } from 'react';
import { Props, WinnerStepType } from '../../config';
import useTween from 'lesca-use-tween';
import { OPEN_DELAY } from '@/settings/config';

const width = 240;
const height = 240;
const AColor = 'color(display-p3 0.537254901960784 0.286274509803922 1)';
const BColor = 'color(display-p3 0.945098039215686 1 0.325490196078431)';

const Canvas = memo(({ data, step }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [style, setStyle] = useTween({ left: 0, right: Math.PI / 2 });

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const degree = Number(style.left);
        const degreeLeft = Number(style.right);

        ctx.clearRect(0, 0, width / 2, height / 2);
        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(width / 2, height / 2);
        ctx.fillStyle = AColor;
        ctx.arc(
          width / 2,
          height / 2,
          width / 2 - 13,
          Math.PI / 2,
          Math.PI / 2 + 2 * Math.PI * degree,
        );
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(width / 2, height / 2);
        ctx.fillStyle = BColor;
        ctx.arc(width / 2, height / 2, width / 2 - 13, degreeLeft, Math.PI / 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.fillStyle = '#fff';
        ctx.arc(width / 2, height / 2, width / 2 - 43, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [style]);

  useEffect(() => {
    if (!data) return;
    else {
      const { status, result } = data;
      if (!status) setStyle({ left: 0, right: Math.PI / 2 }, 1);
      else {
        if (ref.current) {
          const canvas = ref.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            if (step === WinnerStepType.Unset) return;

            const left = result[step].A / 100;
            if (result[step].A === 0 && result[step].B === 0) return;
            setStyle({ left, right: Math.PI / 2 - Math.PI * 2 * (1 - left) }, OPEN_DELAY);
          }
        }
      }
    }
  }, [data, step]);

  const Element = useMemo(() => {
    if (!data) return '?';
    else {
      const { status } = data;
      if (!status) return <div className='ml-[5px] mt-[10px]'>?</div>;
      else return <canvas ref={ref} width={240} height={240} className='h-full w-full' />;
    }
  }, [data, step]);

  return <>{Element}</>;
});
export default Canvas;
