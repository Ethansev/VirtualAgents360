type Props = {
  options: string[];
  inputName: string;
  labelText: string;
};
export default function DropdownField(props: Props) {
  const { options, inputName, labelText } = props;
  return (
    <>
      <label htmlFor={inputName} className='block text-sm font-medium leading-6 text-gray-900'>
        {labelText}
      </label>
      <div className='mt-2'>
        <select
          id={inputName}
          name={inputName}
          // autoComplete='country-name'
          placeholder='Please select'
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
          <option>Please select</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
}
