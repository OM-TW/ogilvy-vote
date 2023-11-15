import InsertGroup from '@/components/insertGroup';
import Table from '@/components/table';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SETTING } from '../../../../setting';
import { CollectionContext, CollectionState, TCollectionState } from './config';
import './index.less';

interface RefObject {
  update: () => void;
}

const Collection = memo(() => {
  const value = useState<TCollectionState>(CollectionState);
  const [, setState] = value;

  const collectionRef = useRef<RefObject>(null);
  const { pathname: collection } = useParams();

  useEffect(() => {
    if (collection) setState((S) => ({ ...S, page: collection }));
  }, [collection]);

  const onSubmit = useCallback(() => {
    collectionRef.current?.update();
  }, []);

  const [col] = SETTING.mongodb.filter((c) => c.collection === collection);
  if (!col) return 'pathname error';
  const { schema } = col;

  return (
    <CollectionContext.Provider value={value}>
      <div className='Table'>
        <h2 className='uppercase'>{collection}</h2>
        {collection && (
          <>
            <Table ref={collectionRef} type={schema} collection={collection} />
            <InsertGroup type={schema} collection={collection} onSubmit={onSubmit} />
          </>
        )}
      </div>
    </CollectionContext.Provider>
  );
});
export default Collection;
