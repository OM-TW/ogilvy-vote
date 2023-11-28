import useSignIn, { TSignInArgument } from '@/hooks/useSignIn';
import { PollingContext, PollingMessage, PollingStepType } from '@/pages/home/polling/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps, ModalSizeType } from '@/settings/type';
import { FormEvent, useCallback, useContext, useEffect } from 'react';
import Button from './button';
import './index.less';
import InputGroup from './input';

const Form = ({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(PollingContext);

  const [respond, signin] = useSignIn();

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
      if (password.length === 4 && extension.length === 3) signin(data);
      else {
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
