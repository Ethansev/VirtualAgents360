'use client';

import { transactionService } from '@/app/api/transactions/transaction-services';
import Form from '@/app/components/form-components/form';
import SectionHeader from '@/app/components/form-components/section-header';
import { Toaster } from '@/components/ui/sonner';
import {
    AddPropertyInformation,
    RealEstateTransaction,
    RealEstateTransactionStage,
    agentAOR,
    propertyType,
    propertyTypeList,
    transactionType,
    transactionTypeList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Shares the same types from sanity schema, but we'll have to do this for each form which might get cumbersome
// TODO: doesn't look like it handles validations from sanity schema
const formSchema: z.ZodType<AddPropertyInformation> = z.object({
    // _type: z.string(),
    agentAOR: z.string({
        required_error: 'Missing agent current AOR',
    }),
    propertyAddress: z.string({ required_error: 'Missing property address' }),
    // invalid_type_error: 'Name must be a string'),
    city: z.string({ required_error: 'Missing city' }),
    state: z.string({ required_error: 'Missing state' }), // TODO: update this when I have list of all states
    zipcode: z.string({ required_error: 'Missing zipcode' }),
    clientEmail: z.string({ required_error: 'Missing client email' }),
    clientFirstName: z.string({ required_error: 'Missing client first name' }),
    clientMiddleName: z.string().optional(),
    clientLastName: z.string({ required_error: 'Missing client last name' }),
    propertyType: z.enum(propertyTypeList),
    transactionType: z.enum(transactionTypeList),
    primaryAgent: z.string({ required_error: 'Missing primary agent' }),
    coopAgent1: z.string().optional(),
    coopAgent2: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
    stage?: RealEstateTransactionStage | null;
    transactionData?: RealEstateTransaction | null;
};

export default function NewPropertyInformationForm(props: Props) {
    const { stage, transactionData } = props;
    const router = useRouter();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function fetchForm(): FormSchema {
        const defaultFormValues: FormSchema = {
            agentAOR: '',
            propertyAddress: '',
            city: '',
            state: '',
            zipcode: '',
            clientEmail: '',
            clientFirstName: '',
            clientMiddleName: '',
            clientLastName: '',
            propertyType: '',
            transactionType: '',
            primaryAgent: '',
            coopAgent1: '',
            coopAgent2: '',
        };

        const newData = { ...defaultFormValues, ...transactionData?.addPropertyInformation };

        if (transactionData) {
            return newData;
            // return { ...defaultFormValues, ...transactionData.addPropertyInformation };
        } else {
            return defaultFormValues;
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: fetchForm(),
    });

    const methods = useForm();

    async function onSave(formData: FieldValues) {
        console.log('printing data from onSave:', formData);
        setLoading(true);
        setSuccess(false);

        // TODO: pass agent name, status, and stage

        if (transactionData) {
            const data = {
                ...transactionData,
                addPropertyInformation: { ...formData } as AddPropertyInformation,
            };
            toast.promise(
                async () => {
                    const res = await transactionService.updateRealEstateTransaction(data);
                    console.log('printing res from update', res);
                },
                {
                    loading: 'Loading...',
                    success: () => 'Successfully saved!',
                    error: 'Error',
                },
            );
        } else {
            // TODO: add general transaction data like agent name here
            // TODO: fix type that we're passing to createRealEstateTransaction
            toast.promise(
                async () => {
                    const res = await transactionService.createRealEstateTransaction(
                        formData as FormSchema,
                    );
                    router.push(`/real-estate/transaction/${res._id}`);
                },
                {
                    loading: 'Loading...',
                    success: () => 'Successfully saved!',
                    error: 'Error',
                },
            );
        }

        // FIXME: fix resend
        // const resend_response = await test();
        // console.log('printing resend response', resend_response);

        setLoading(false);
        setSuccess(true);
    }

    // async function onSaveAndContinue(data: FieldValues) {
    //     router.push(`/real-estate/transaction/${res._id}/?stage=transactionRegistration`);
    // }

    // TODO: I wanted to create components for the input fields but register() doesn't like to work well with formcontext
    return (
        <FormProvider {...methods}>
            <Form methods={methods} onSubmit={handleSubmit(onSave)}>
                {/* <SuccessAlert message='Successfully updated' /> */}
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='col-span-full mb-8'>
                        <SectionHeader text={'LRFO Requirement'} />
                        <label className={`${errors.agentAOR ? 'ring-red-500' : ''}`}>
                            Agent Current AOR
                            <select {...register('agentAOR', { required: true })}>
                                <option value=''>Please select</option>
                                {agentAOR.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.title}
                                    </option>
                                ))}
                            </select>
                            <p className='text-red-500'>{errors?.agentAOR?.message}</p>
                        </label>
                    </div>
                    <div className='mb-8'>
                        <SectionHeader text={'Transaction Information'} />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <label
                                className={`col-span-full ${errors.propertyAddress ? 'ring-red-500' : ''}`}>
                                <span>New Property Address</span>
                                <input
                                    type='text'
                                    {...register('propertyAddress', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.propertyAddress?.message}</p>
                            </label>

                            <label className={`sm:col-span-2 ${errors.city ? 'ring-red-500' : ''}`}>
                                <span>City</span>
                                <input type='text' {...register('city', { required: true })} />
                                <p className='text-red-500'>{errors?.city?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.state ? 'ring-red-500' : ''}`}>
                                <span>State</span>
                                <input type='text' {...register('state', { required: true })} />
                                <p className='text-red-500'>{errors?.state?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.zipcode ? 'ring-red-500' : ''}`}>
                                <span>Zipcode</span>
                                <input type='text' {...register('zipcode', { required: true })} />
                                <p className='text-red-500'>{errors?.zipcode?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.clientFirstName ? 'ring-red-500' : ''}`}>
                                <span>Client First Name</span>
                                <input
                                    type='text'
                                    {...register('clientFirstName', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.clientFirstName?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.clientLastName ? 'ring-red-500' : ''}`}>
                                <span>Client Last Name</span>
                                <input
                                    type='text'
                                    {...register('clientLastName', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.clientLastName?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.clientLastName ? 'ring-red-500' : ''}`}>
                                <span>Client Last Name</span>
                                <input
                                    type='text'
                                    {...register('clientLastName', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.clientLastName?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.clientEmail ? 'ring-red-500' : ''}`}>
                                <span>Client Email</span>
                                <input
                                    type='text'
                                    {...register('clientEmail', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.clientEmail?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.propertyType ? 'ring-red-500' : ''}`}>
                                <span>Property Type</span>
                                <select {...register('propertyType', { required: true })}>
                                    <option value=''>Please select</option>
                                    {propertyType.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.title}
                                        </option>
                                    ))}
                                </select>
                                <p className='text-red-500'>{errors?.propertyType?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.transactionType ? 'ring-red-500' : ''}`}>
                                <span>Transaction Type</span>
                                <select {...register('transactionType', { required: true })}>
                                    <option value=''>Please select</option>
                                    {transactionType.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.title}
                                        </option>
                                    ))}
                                </select>
                                <p className='text-red-500'>{errors?.transactionType?.message}</p>
                            </label>
                        </div>
                    </div>

                    <div className='mb-8'>
                        <SectionHeader text={'Agent Information'} />{' '}
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <label
                                className={`sm:col-span-2 ${errors.primaryAgent ? 'ring-red-500' : ''}`}>
                                <span>Primary Agent</span>
                                <input
                                    type='text'
                                    {...register('primaryAgent', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.primaryAgent?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.coopAgent1 ? 'ring-red-500' : ''}`}>
                                <span>Co-Op Agent 1</span>
                                <input
                                    type='text'
                                    {...register('coopAgent1', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.coopAgent1?.message}</p>
                            </label>

                            <label
                                className={`sm:col-span-2 ${errors.coopAgent2 ? 'ring-red-500' : ''}`}>
                                <span>Co-Op Agent 2</span>
                                <input
                                    type='text'
                                    {...register('coopAgent2', { required: true })}
                                />
                                <p className='text-red-500'>{errors?.coopAgent2?.message}</p>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Save
                    </button>
                    <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Save and Continue
                    </button>
                </div>
            </Form>
        </FormProvider>
    );
}
