import { Context } from '@/settings/constant';
import { ActionType, ModalSizeType } from '@/settings/type';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

const Modal = memo(() => {
  const [context, setContext] = useContext(Context);
  const { title, body, label, onClose, size = ModalSizeType.size11 } = context[ActionType.modal];

  return (
    <dialog
      id='my_modal_4'
      className='modal modal-open'
      onClick={() => {
        setContext({ type: ActionType.modal, state: { enabled: false } });
      }}
    >
      <div className={twMerge('modal-box min-w-[450px] max-w-7xl bg-[var(--color-gray)]', size)}>
        <h3 className='text-lg font-bold text-[var(--color-red)]'>{title}</h3>
        <div className='py-4 text-[var(--color-red)]'>{body}</div>
        <div className='modal-action'>
          <form method='dialog'>
            <button
              onClick={() => {
                setContext({ type: ActionType.modal, state: { enabled: false } });
              }}
              className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2 text-[var(--color-red)]'
            >
              ✕
            </button>
            <button
              onClick={() => {
                onClose();
                setContext({ type: ActionType.modal, state: { enabled: false } });
              }}
              className='btn border-transparent bg-[var(--color-red)] font-mono text-[var(--color-gray)] hover:border-[var(--color-red)] hover:bg-[var(--color-gray)] hover:text-[var(--color-red)]'
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
