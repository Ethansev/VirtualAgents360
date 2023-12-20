import React from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  validation?: {};
  className?: string;
};

function errorBorder(errors: FieldErrors<FieldValues>, name: string) {
  const error = errors[name];
  if (error) {
    return 'ring-red-500';
  } else {
    return 'ring-gray-300';
  }
}

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

const SelectField = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { name, label, options, validation, className } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (name === 'agentAOR') console.log('errors', errors);

  return (
    <div className={className}>
      <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
      <select
        {...register(name, validation)}
        className={twMerge(
          errorBorder(errors, name),
          'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6',
        )}>
        <option value=''>Please select</option>
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </select>
      {errors && <p className='text-red-500'>{errorCondition(errors, name)}</p>}
    </div>
  );
});

SelectField.displayName = 'SelectField';
export default SelectField;
