import useVote from '@/hooks/useVote';
import { Context } from '@/settings/constant';
import { ActionType, ModalSizeType, TransitionType } from '@/settings/type';
import Click from 'lesca-click';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PollingContext, PollingMessage, PollingOptionType, PollingStepType } from './config';
import './conform.less';
import { Back, Button, CardA, CardB } from './conformElements';

const MAX_HEIGHT = 880;

const Conform = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(PollingContext);
  const { extension, option } = state;
  const [respond, vote] = useVote();
  const [transition, setTransition] = useState(TransitionType.Unset);

  const Card = useMemo(() => {
    if (option === PollingOptionType.A) return <CardA transition={transition} />;
    else return <CardB transition={transition} />;
  }, [option, transition]);

  useEffect(() => {
    const resize = () => {
      const { innerHeight } = window;
      let ratio = innerHeight / MAX_HEIGHT;
      const minRatio = 550 / MAX_HEIGHT;
      if (ratio > 1) ratio = 1;
      if (ref.current) ref.current.style.transform = `scale(${Math.max(ratio, minRatio)})`;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  useEffect(() => {
    Click.add('#back', () => setState((S) => ({ ...S, step: PollingStepType.vote })));
    Click.add('#ok', () => vote({ extension, vote: option === PollingOptionType.A }));
    return () => {
      Click.remove('#back');
      Click.remove('#ok');
    };
  }, []);

  useEffect(() => {
    if (respond) {
      if (respond.res) {
        setState((S) => ({ ...S, step: PollingStepType.finish }));
      } else {
        const vote: { [k: string]: string } = PollingMessage.vote;
        const currentMsg: string = vote[String(respond.msg)];
        setContext({
          type: ActionType.modal,
          state: {
            enabled: true,
            title: '系統訊息',
            body: currentMsg || '錯誤',
            size: ModalSizeType.auto,
          },
        });
      }
    }
  }, [respond]);

  return (
    <OnloadProvider
      onload={() => {
        setTransition(TransitionType.FadeIn);
      }}
    >
      <div className='Conform'>
        <div ref={ref} className='w-full origin-top'>
          <Back transition={transition} />
          {Card}
          <Button transition={transition} />
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Conform;
