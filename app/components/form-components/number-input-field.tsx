import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
    UseControllerProps,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
    name: Path<T>;
    error: FieldError | undefined;
    label: string;
    className?: string;
    control: Control<T>;
}

export default function NumberInputField<T extends FieldValues>(props: Props<T>) {
    const { name, error, label, className, control } = props;

    return (
        <div className={twMerge('', className)}>
            <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        className={twMerge(
                            error ? 'ring-red-500' : 'ring-gray-300',
                            'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                    />
                )}
            />
            {error && <p className='text-red-500'>{error.message}</p>}
        </div>
    );
}
