import { TEASER_DATE } from '@/settings/config';
import { useCountdown } from 'lesca-use-countdown';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';
import Card from './card';
import ActivityImage from './img/vote-box.jpg';
import AminImage from './img/web-ui.jpg';
import './index.less';

const Button = ({ onClick, disable = false }: { onClick: () => void; disable?: boolean }) => (
  <button className={twMerge('btn btn-primary', disable && 'btn-disabled')} onClick={onClick}>
    Launch
  </button>
);

const Unit = ['天', '小時', '分鐘', '秒'];

const Home = memo(() => {
  const [date] = useCountdown(TEASER_DATE);
  const navigate = useNavigate();
  return (
    <div className='Home'>
      <Card
        title='Ogilvy-vote-page'
        url={ActivityImage}
        button={
          <Button
            disable
            onClick={() => {
              navigate('/admin');
            }}
          />
        }
      >
        <div className='flex flex-row justify-center'>
          <p>開始投票還剩</p>
          <div className='bg-primary px-2'>
            {date
              .map((e, i) => {
                return `${e}${Unit[i]}`;
              })
              .join(' ')}
          </div>
        </div>
      </Card>
      <Card
        title='Dashboard-admin'
        url={AminImage}
        button={
          <Button
            onClick={() => {
              navigate('/admin');
            }}
          />
        }
      >
        <p>活動資料庫後臺和Rest API測試</p>
      </Card>
    </div>
  );
});
export default Home;
