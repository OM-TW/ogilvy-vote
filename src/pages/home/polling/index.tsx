import Background from '@/components/background';
import Dialog from '@/components/dialog';
import Logo from '@/components/logo';
import Stamp from '@/components/stamp';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { PollingContext, PollingState, PollingStepType } from './config';
import Conform from './conform';
import Finish from './finish';
import './index.less';
import Login from './login';
import Vote from './vote';

const Polling = memo(() => {
  const [, setContext] = useContext(Context);
  const value = useState(PollingState);
  const [state] = value;
  const { step } = state;

  const [transition, setTransition] = useState(TransitionType.Unset);
  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  const Page = useMemo(() => {
    switch (step) {
      case PollingStepType.finish:
        return <Finish />;

      case PollingStepType.conform:
        return <Conform />;

      case PollingStepType.vote:
        return <Vote />;

      case PollingStepType.login:
      default:
        return <Login />;
    }
  }, [step]);

  return (
    <PollingContext.Provider value={value}>
      <OnloadProvider
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          setTransition(TransitionType.FadeIn);
        }}
      >
        <div className='Polling'>
          <Background />
          <Dialog transition={transition}>
            <Dialog.Top>
              <Logo className='relative scale-150' />
              <Stamp />
            </Dialog.Top>
            <Dialog.Body>{Page}</Dialog.Body>
          </Dialog>
        </div>
      </OnloadProvider>
    </PollingContext.Provider>
  );
});
export default Polling;
