import { IReactProps } from '@/settings/type';
import { ReactNode, memo } from 'react';

type T = {
  title: string;
  url: string;
  button?: ReactNode;
};
const Card = memo(({ children, title = 'title', url, button }: IReactProps & T) => (
  <div className='card m-5 w-96 bg-base-100 shadow-xl'>
    <figure>
      <img src={url} alt='Cover' />
    </figure>
    <div className='card-body'>
      <h2 className='card-title'>{title}</h2>
      {children}
      {button && <div className='card-actions justify-end'>{button}</div>}
    </div>
  </div>
));
export default Card;
