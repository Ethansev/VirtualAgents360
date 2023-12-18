import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
  name: string;
  label: string;
  error: FieldError | undefined;
  className?: string;
};

const TextInputField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, error, className } = props;
  const { register } = useFormContext();

  return (
    <div className={twMerge('', className)}>
      <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
      <input
        {...register(name)}
        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
      {error && <p className='text-red-500'>{error.message}</p>}
    </div>
  );
});

TextInputField.displayName = 'TextInputField';
export default TextInputField;
