import Drawer from '@/components/drawer';
import Navbar from '@/components/navbar';
import Storage from 'lesca-local-storage';
import { memo, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SETTING } from '../../../setting';
import Collection from './collection';
import { AdminContext, AdminState, TAdminState } from './config';
import './index.less';
import Login from './login';
import AdminMain from './main';
import Test from './test';
import Import from './import';

const Admin = memo(() => {
  const [state, setState] = useState<TAdminState>(AdminState);
  const { data, timestamp } = Storage.get(SETTING.dashboard.session.name);

  const status = useMemo(() => {
    if (!data) return false;
    else if (timestamp > SETTING.dashboard.session.time) return false;
    return true;
  }, [data, timestamp]);

  const { pathname } = useParams();

  const Page = useMemo(() => {
    if (!pathname) return <AdminMain />;
    else if (pathname === 'test') return <Test />;
    else if (pathname === 'import') return <Import />;
    return <Collection />;
  }, [pathname]);

  return (
    <div className='Admin'>
      <AdminContext.Provider value={[state, setState]}>
        {status ? (
          <Drawer>
            <Navbar />
            {Page}
          </Drawer>
        ) : (
          <Login />
        )}
      </AdminContext.Provider>
    </div>
  );
});

export default Admin;
