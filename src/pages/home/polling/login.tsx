import Form from '@/components/form';
import { memo } from 'react';

const Login = memo(() => {
  return (
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
  );
});
export default Login;
