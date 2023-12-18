import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  error: FieldError | undefined;
  options: { label: string; value: string }[];
  className?: string;
};

const SelectField = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { name, label, options, className } = props;
  const { register } = useFormContext();

  return (
    <div className={className}>
      <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
      <div className='mt-2'>
        <select
          {...register(name)}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
          <option>Please select</option>
          {options.map((option) => (
            <option key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

SelectField.displayName = 'SelectField';
export default SelectField;
