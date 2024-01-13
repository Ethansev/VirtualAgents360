import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  register: UseFormRegisterReturn<string>;
  label: string;
  required?: boolean;
  className?: string;
};

const EmailInputField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { register, label, required, className } = props;
  return (
    <div className={className}>
      <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <input
          {...register}
          ref={ref}
          type='email'
          required={required}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  );
});

EmailInputField.displayName = 'EmailInputField';
export default EmailInputField;
