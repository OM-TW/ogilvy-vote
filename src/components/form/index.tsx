import { IReactProps } from '@/settings/type';
import { FormEvent, useCallback } from 'react';
import './index.less';
import InputGroup from './input';
import Button from './button';

const Form = ({ children }: IReactProps) => {
  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const data = Object.fromEntries([...new FormData(event.target as HTMLFormElement)]);
    console.log(data);
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
