import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { memo, useContext } from 'react';
import ReactLoading from 'react-loading';

const Background = () => <div className='absolute top-0 h-full w-full bg-secondary opacity-80' />;

const Text = ({ children }: IReactProps) => <span className='relative uppercase'>{children}</span>;

const LoadingProcess = memo(() => {
  const [context] = useContext(Context);
  const data = context[ActionType.LoadingProcess];
  return (
    <div className='fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center space-y-3 text-accent'>
      <Background />
      <ReactLoading className='relative' type={data?.type} color='#8949ff' />
      {data?.body && <Text>{data.body}</Text>}
    </div>
  );
});
export default LoadingProcess;
