import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';

const Modal = memo(() => {
  const [context, setContext] = useContext(Context);
  const { title, body, label, onClose } = context[ActionType.modal];

  return (
    <dialog id='my_modal_4' className='modal modal-open'>
      <div className='modal-box w-11/12 max-w-7xl'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <div className='py-4'>{body}</div>
        <div className='modal-action'>
          <form method='dialog'>
            <button
              onClick={() => {
                setContext({ type: ActionType.modal, state: { enabled: false } });
              }}
              className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'
            >
              ✕
            </button>
            <button
              onClick={() => {
                onClose();
                setContext({ type: ActionType.modal, state: { enabled: false } });
              }}
              className='btn'
            >
              {label}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});
export default Modal;
