import useSignIn, { TSignInArgument } from '@/hooks/useSignIn';
import { PollingContext, PollingMessage, PollingStepType } from '@/pages/home/polling/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps, ModalSizeType } from '@/settings/type';
import { FormEvent, useCallback, useContext, useEffect, useRef } from 'react';
import Button from './button';
import './index.less';
import InputGroup from './input';
import useCheck from '@/hooks/useCheck';

const Form = ({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(PollingContext);

  const ref = useRef({ extension: '', password: '' });

  const [checkRespond, check] = useCheck();
  const [respond, signin] = useSignIn();

  useEffect(() => {
    if (checkRespond) {
      if (checkRespond.res) {
        signin({ ...ref.current });
      } else {
        const check: { [k: string]: string } = PollingMessage.check;
        const currentMsg: string = check[String(checkRespond.msg)];
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
  }, [checkRespond]);

  useEffect(() => {
    if (respond) {
      if (respond.res) {
        if (respond.data) {
          const { extension } = respond.data[0] as TSignInArgument;
          setState((S) => ({ ...S, step: PollingStepType.vote, extension }));
        }
      } else {
        setContext({
          type: ActionType.modal,
          state: { enabled: true, size: ModalSizeType.auto, ...PollingMessage.login.error },
        });
      }
    }
  }, [respond]);

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const data = Object.fromEntries([
      ...new FormData(event.target as HTMLFormElement),
    ]) as TSignInArgument;
    const { extension, password } = data;
    if (extension && password) {
      if (password.length === 4 && extension.length === 3) {
        ref.current = { extension, password };
        check({ extension });
      } else {
        setContext({
          type: ActionType.modal,
          state: { enabled: true, size: ModalSizeType.auto, ...PollingMessage.login.format },
        });
      }
    } else {
      setContext({
        type: ActionType.modal,
        state: { enabled: true, size: ModalSizeType.auto, ...PollingMessage.login.error },
      });
    }
  }, []);

  return (
    <form className='regularForm' onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.input = InputGroup;
Form.button = Button;

export default Form;
