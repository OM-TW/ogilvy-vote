import Background from '@/components/background';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { PollingContext, PollingState, PollingStepType } from './config';
import './index.less';
import Dialog from '@/components/dialog';
import Logo from '@/components/logo';
import Stamp from '@/components/stamp';
import Form from '@/components/form';

const Polling = memo(() => {
  const [, setContext] = useContext(Context);
  const value = useState(PollingState);
  const [, setState] = value;

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <PollingContext.Provider value={value}>
      <OnloadProvider
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          setState((S) => ({ ...S, step: PollingStepType.login }));
        }}
      >
        <div className='Polling'>
          <Background />
          <Dialog>
            <Dialog.Top>
              <Logo className='relative scale-150' />
              <Stamp />
            </Dialog.Top>
            <Dialog.Body>
              <Form>
                <Form.input
                  {...{
                    type: 'number',
                    defaultValue: '',
                    placeholder: '---',
                    name: 'extension',
                    maxLength: 3,
                    label: <div className='extension label' />,
                  }}
                />
                <Form.input
                  {...{
                    type: 'password',
                    defaultValue: '',
                    placeholder: '----',
                    name: 'password',
                    maxLength: 4,
                    label: <div className='password label' />,
                  }}
                />
                <Form.button>
                  <div className='conform' />
                </Form.button>
              </Form>
            </Dialog.Body>
          </Dialog>
        </div>
      </OnloadProvider>
    </PollingContext.Provider>
  );
});
export default Polling;
