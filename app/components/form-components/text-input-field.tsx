import { NewPropertyInformationFormSchema } from '@/app/(transactions)/real-estate/components/real-estate-forms/new-property-information';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type FormSchema = NewPropertyInformationFormSchema;
// register: UseFormRegister<TFieldValues>;

type Props = {
    name: string;
    // register: UseFormRegister<FieldValues>;
    register: any; // TODO: fix this type
    errors: FieldErrors;
    validation?: FieldValues;
    label: string;
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
    // TODO: add all error types and messages to a util file
    if (error && error.type === 'required') {
        return 'This field is required';
    } else if (error && typeof error.message === 'string') {
        return error!.message as string;
    } else {
        return '';
    }
}

// TODO: react-hook-forms doesn't pass the defaultValue to this component. I should look into workarounds,
function TextInputField(props: Props) {
    const { name, validation, label, className } = props;
    const {
        register,
        formState: { errors },
    } = useFormContext();

    // console.group('TextInputField');
    // console.log('printing name: ', name);
    // console.log('printing validation: ', validation);
    // console.log('printing errors: ', errors);
    // console.groupEnd();

    return (
        <div className={twMerge('', className)}>
            <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
            <input
                {...register(name, validation)}
                className={twMerge(
                    errorBorder(errors, name),
                    'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                )}
                aria-invalid={errors[name] ? 'true' : 'false'}
            />
            {errors[name] && <p className='text-red-500'>{errorCondition(errors, name)}</p>}
        </div>
    );
}

// const TextInputField = React.forwardRef<HTMLInputElement, Props>(
//     ({ register, name, validation, label, className }) => {
//         const {
//             // register,
//             formState: { errors },
//         } = useFormContext();
//
//         // console.group('TextInputField');
//         // console.log('printing name: ', name);
//         // console.log('printing validation: ', validation);
//         // console.log('printing errors: ', errors);
//         // console.groupEnd();
//
//         return (
//             <div className={twMerge('', className)}>
//                 <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
//                 <input
//                     {...register(name, validation)}
//                     // {...props}
//                     // ref={ref}
//                     className={twMerge(
//                         errorBorder(errors, name),
//                         'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
//                     )}
//                     aria-invalid={errors[name] ? 'true' : 'false'}
//                 />
//                 {errors[name] && <p className='text-red-500'>{errorCondition(errors, name)}</p>}
//             </div>
//         );
//     },
// );
//
TextInputField.displayName = 'TextInputField';
export default TextInputField;
