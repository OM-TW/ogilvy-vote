import useLogin, { TParm } from '@/hooks/useLogin';
import { SETTING } from '../../../setting';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Storage from 'lesca-local-storage';
import { FormEvent, memo, useCallback, useContext, useEffect } from 'react';
import coverImage from './img/cover.png';

const Login = memo(() => {
  const [, setContext] = useContext(Context);
  const [respond, fetchLogin] = useLogin();

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const data = Object.fromEntries([...new FormData(event.target as HTMLFormElement)]) as TParm;
    fetchLogin(data);
  }, []);

  useEffect(() => {
    if (respond?.res) {
      Storage.set(SETTING.dashboard.session.name, respond);
      setContext({ type: ActionType.Status, state: { enabled: true } });
    }
  }, [respond]);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='card max-w-2xl lg:card-side bg-base-100 shadow-xl'>
        <figure>
          <img src={coverImage} alt='Album' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Welcome to MMORPG dashboard.</h2>
          <p>Please Login to continue...</p>
          <form onSubmit={onSubmit}>
            <div className='join join-vertical my-5'>
              <input
                className='input border-secondary join-item'
                placeholder='username'
                name='username'
                type='text'
              />
              <input
                className='input  border-primary join-item'
                placeholder='password'
                name='password'
                type='password'
              />
            </div>
            {respond?.res === false && <div className='text-error'>{respond.msg}</div>}
            <div className='card-actions justify-end'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
export default Login;
