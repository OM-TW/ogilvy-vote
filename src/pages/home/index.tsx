import { TEASER_DATE } from '@/settings/config';
import useCountdown from 'lesca-use-countdown';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeContext, HomePageType, HomeState, THomeState } from './config';
import './index.less';
import Teaser from './teaser';
import Polling from './polling';

const Home = memo(() => {
  const value = useState<THomeState>(HomeState);
  const [state] = value;
  const { page } = state;
  const [date] = useCountdown(TEASER_DATE);
  const navigate = useNavigate();

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === '.') navigate('/admin');
    };

    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  const Page = useMemo(() => {
    const [day, hours, minute, second] = date;
    let currentPage = HomePageType.teaser;
    if (!day && !hours && !minute && !second) {
      if (page === HomePageType.billing) currentPage = HomePageType.billing;
      else currentPage = HomePageType.polling;
    } else currentPage = HomePageType.teaser;

    switch (currentPage) {
      case HomePageType.billing:
        return <div />;
      case HomePageType.polling:
        return <Polling />;
      default:
      case HomePageType.teaser:
        return <Teaser date={date} />;
    }
  }, [date, page]);

  return (
    <HomeContext.Provider value={value}>
      <div className='Home'>{Page}</div>
    </HomeContext.Provider>
  );
});
export default Home;
