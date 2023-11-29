import { TEASER_DATE } from '@/settings/config';
import QueryString from 'lesca-url-parameters';
import useCountdown from 'lesca-use-countdown';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeContext, HomePageType, HomeState, THomeState } from './config';
import './index.less';
import Polling from './polling';
import Teaser from './teaser';

const Home = memo(() => {
  const value = useState<THomeState>(HomeState);
  const [state] = value;
  const { page } = state;
  const [date] = useCountdown(TEASER_DATE);
  const navigate = useNavigate();

  useEffect(() => {
    const page = QueryString.get('page');
    if (page) navigate(`/${page}`);

    const keydown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === '.') navigate('/admin');
      if (key === '/') navigate('/winner');
    };

    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  const Page = useMemo(() => {
    const [day, hours, minute, second] = date;
    let currentPage = HomePageType.teaser;
    if (!day && !hours && !minute && !second) currentPage = HomePageType.polling;
    else currentPage = HomePageType.teaser;

    switch (currentPage) {
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
