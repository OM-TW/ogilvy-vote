import { memo, useEffect } from 'react';
import './index.less';
import { CopyBlock, monokai } from 'react-code-blocks';

const SchemaTable = memo(
  ({ queryString, respondBody }: { queryString: string; respondBody: string }) => {
    useEffect(() => {}, []);
    return (
      <div className='w-full overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>form</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Method</td>
              <td>POST</td>
            </tr>
            <tr>
              <td>query params</td>
              <td>
                <CopyBlock
                  text={queryString}
                  language='typescript'
                  showLineNumbers
                  theme={monokai}
                />
              </td>
            </tr>
            <tr>
              <td>respond body</td>
              <td>
                <CopyBlock
                  text={respondBody}
                  language='typescript'
                  showLineNumbers
                  theme={monokai}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
);
export default SchemaTable;
