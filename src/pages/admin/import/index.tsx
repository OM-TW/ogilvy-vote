import { memo, useEffect } from 'react';
import { p } from '@/settings/data';
import { useInsertMany } from '@/hooks/useInsert';
import { useVoteMany } from '@/hooks/useVote';

const Import = memo(() => {
  const [voteRes, vote] = useVoteMany();

  useEffect(() => {
    if (voteRes) {
      alert(voteRes.msg);
    }
  }, [voteRes]);

  const [respond, insert] = useInsertMany();
  useEffect(() => {
    if (respond) {
      alert(respond.msg);
    }
  }, [respond]);
  return (
    <div className='Import'>
      <div className='w-full py-5 text-center text-7xl text-error'>開發者專用請不要按</div>
      <div className='join'>
        <button
          onClick={() => {
            const data = p.map((user) => {
              const [
                department,
                ,
                employeeID,
                name,
                firstName,
                lastName,
                userID,
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
        <button
          className='btn btn-info join-item'
          onClick={() => {
            const data = p.map((user) => {
              const [, , , , , , , extension, , ,] = user;
              const currentExtension = extension.slice(1);
              const vote = Math.random() > 0.5;

              return { extension: currentExtension, vote };
            });
            vote(data);
          }}
        >
          vote as random
        </button>
      </div>
    </div>
  );
});
export default Import;
