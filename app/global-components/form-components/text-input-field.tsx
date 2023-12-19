import React from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
  name: string;
  label: string;
  validation?: {};
  className?: string;
};

function errorCondition(errors: FieldErrors<FieldValues>, name: string) {
  const error = errors[name];
  // TODO: move all error types and messages to a util file
  if (error && error.type === 'required') {
    return 'This field is required';
  } else if (error && typeof error.message === 'string') {
    return errors[name]!.message as string;
  } else {
    return '';
  }
}

const TextInputField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, className, validation } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={twMerge('', className)}>
      <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
      <input
        {...register(name, validation)}
        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        aria-invalid={errors[name] ? 'true' : 'false'}
      />
      {errors && <p className='text-red-500'>{errorCondition(errors, name)}</p>}
    </div>
  );
});

TextInputField.displayName = 'TextInputField';
export default TextInputField;
