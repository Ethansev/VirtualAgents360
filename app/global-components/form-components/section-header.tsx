type Props = {
  text: string;
};

export default function SectionHeader({ text }: Props) {
  // return <h2 className='text-base font-semibold leading-7 text-gray-900'>{text}</h2>;
  return (
    <div className='relative my-4'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className='relative flex justify-start'>
        <span className='bg-white pr-3 text-base font-semibold leading-6 text-gray-900'>
          {text}
        </span>
      </div>
    </div>
  );
}
