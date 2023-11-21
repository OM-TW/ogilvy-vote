import Logo from '@/components/logo';
import Pattern from '@/components/pattern';
import Section from '@/components/section';
import { memo, useContext, useEffect, useState } from 'react';
import './index.less';
import Stamp from './stamp';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import Countdown from './countdown';
import OnloadProvider from 'lesca-react-onload';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useNavigate } from 'react-router-dom';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const value = useState<THomeState>(HomeState);
  const [, setState] = value;

  const navigate = useNavigate();

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });

    const keydown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === '.') {
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <HomeContext.Provider value={value}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: HomeStepType.fadeIn }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Home'>
          <Section top>
            <Logo />
            <Pattern top />
            <Stamp />
          </Section>
          <Section>
            <Pattern />
            <Countdown />
          </Section>
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});
export default Home;
