import Logo from '@/components/logo';
import Pattern from '@/components/pattern';
import Section from '@/components/section';
import { memo, useContext, useEffect } from 'react';
import Countdown from './countdown';
import './index.less';
import Stamp from './stamp';
import OnloadProvider from 'lesca-react-onload';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { HomeContext, HomeStepType } from '../config';

const Teaser = memo(({ date }: { date: number[] }) => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(HomeContext);
  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);
  return (
    <OnloadProvider
      onload={() => {
        setState((S) => ({ ...S, step: HomeStepType.fadeIn }));
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <div className='Teaser'>
        <Section top>
          <Logo />
          <Pattern top />
          <Stamp />
        </Section>
        <Section>
          <Pattern />
          <Countdown date={date} />
        </Section>
      </div>
    </OnloadProvider>
  );
});
export default Teaser;
