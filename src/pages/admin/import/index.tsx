import { memo, useEffect } from 'react';
import { p } from '@/settings/data';
import { useInsertMany } from '@/hooks/useInsert';

const Import = memo(() => {
  const [respond, insert] = useInsertMany();
  useEffect(() => {
    if (respond) {
      alert(respond.msg);
    }
  }, [respond]);
  return (
    <div className='Import'>
      <div className='join'>
        <button
          onClick={() => {
            const data = p.map((user) => {
              const [
                department,
                employeeID,
                name,
                firstName,
                lastName,
                userID,
                ,
                extension,
                email,
              ] = user;
              const currentExtension = extension.slice(1);
              return {
                department,
                employeeID,
                name,
                firstName,
                lastName,
                userID,
                extension: currentExtension,
                email,
              };
            });
            insert({ collection: 'user', data });
          }}
          className='btn btn-success join-item'
        >
          import all user
        </button>
      </div>
    </div>
  );
});
export default Import;
