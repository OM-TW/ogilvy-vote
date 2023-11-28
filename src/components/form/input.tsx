import { ChangeEvent, ReactNode, memo } from 'react';

type TArgument = {
  type: string;
  name: string;
  placeholder: string;
  maxLength?: number;
  defaultValue?: string;
  label: ReactNode;
};

const InputGroup = memo((props: TArgument) => {
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.maxLength === undefined) return;
    const { value } = e.target;
    if (value.length > props.maxLength) {
      e.target.value = value.slice(0, props.maxLength);
    }
  };
  return (
    <div className='-ml-16 flex w-full max-w-md flex-row items-center justify-center space-x-2'>
      <div className='flex h-full w-full flex-1 items-center justify-end text-right font-FZLanTingHeiT text-2xl text-[var(--color-red)]'>
        {props.label}
      </div>
      <div className='w-7/12'>
        <input {...props} onInput={onInput} />
      </div>
    </div>
  );
});
export default InputGroup;
