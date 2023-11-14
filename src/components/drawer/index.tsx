import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SETTING } from '../../../setting';

const Drawer = memo(({ children }: IReactProps) => (
  <div className='drawer lg:drawer-open'>
    <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
    <div className='drawer-content flex flex-col pt-16 items-center justify-center relative'>
      {children}
    </div>
    <div className='drawer-side'>
      <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
      <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
        {/* Sidebar content here */}
        <div className='w-full py-5'>COLLECTION LIST</div>
        <li>
          {SETTING.mongodb.map((collection) => {
            return (
              <Link key={collection.collection} to={`/${collection.collection}`}>
                {collection.collection}
              </Link>
            );
          })}
          <Link to='/test'>
            <svg
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='fill-white w-4 h-4'
            >
              <path
                clipRule='evenodd'
                fillRule='evenodd'
                fill='#fff'
                d='M10 1c3.866 0 7 1.79 7 4s-3.134 4-7 4-7-1.79-7-4 3.134-4 7-4zm5.694 8.13c.464-.264.91-.583 1.306-.952V10c0 2.21-3.134 4-7 4s-7-1.79-7-4V8.178c.396.37.842.688 1.306.953C5.838 10.006 7.854 10.5 10 10.5s4.162-.494 5.694-1.37zM3 13.179V15c0 2.21 3.134 4 7 4s7-1.79 7-4v-1.822c-.396.37-.842.688-1.306.953-1.532.875-3.548 1.369-5.694 1.369s-4.162-.494-5.694-1.37A7.009 7.009 0 013 13.179z'
              />
            </svg>
            Rest API Test
          </Link>
        </li>
      </ul>
    </div>
  </div>
));
export default Drawer;
