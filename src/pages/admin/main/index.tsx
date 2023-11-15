import { memo } from 'react';
import { SETTING } from '../../../../setting';
import './index.less';
import Table from './table';

const AdminMain = memo(() => (
  <div className='AdminMain'>
    {SETTING.mongodb.map((data) => (
      <Table key={data.collection} data={[data]} />
    ))}
  </div>
));
export default AdminMain;
