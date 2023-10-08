type Props = {
  children: React.ReactNode;
  renderImportantInfo: () => React.ReactNode;
};

export default function TemplateComponent({ children, renderImportantInfo }: Props) {
  return (
    <div className='mt-16'>
      <div className='grid grid-cols-12 gap-x-8'>
        <div className='col-span-2'>
          <div className='pl-4'>Side Form Nav</div>
        </div>
        <div className='col-span-8'>{children}</div>
        <div className='col-span-2'>
          <div>
            <h1>Important Info & Procedures</h1>
            <div>{renderImportantInfo()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
