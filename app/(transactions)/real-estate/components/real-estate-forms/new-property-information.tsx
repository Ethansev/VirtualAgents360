'use client';

import { transactionService } from '@/app/api/transactions/transaction-services';
import Form from '@/app/components/form-components/form';
import SectionHeader from '@/app/components/form-components/section-header';
import TextInputField from '@/app/components/form-components/text-input-field';
import { stringWithMinLength } from '@/app/utils/utils';
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

const formSchema: z.ZodType<AddPropertyInformation> = z.object({
    agentAOR: stringWithMinLength(),
    propertyAddress: stringWithMinLength(),
    city: stringWithMinLength(),
    // TODO: update state when I have list of all states
    state: stringWithMinLength(),
    zipcode: stringWithMinLength(),
    clientEmail: stringWithMinLength(),
    clientFirstName: stringWithMinLength(),
    clientMiddleName: z.string().optional(),
    clientLastName: stringWithMinLength(),
    propertyType: z.enum(propertyTypeList, {
        errorMap: () => ({ message: 'Please select one' }),
    }),
    transactionType: z.enum(transactionTypeList, {
        errorMap: () => ({ message: 'Please select one' }),
    }),
    primaryAgent: stringWithMinLength(),
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
        control,
        formState: { errors },
    } = useForm<FormSchema>({
        // mode: 'onBlur',
        // reValidateMode: 'onBlur',
        resolver: zodResolver(formSchema),
        defaultValues: fetchForm(),
    });

    const methods = useForm<FormSchema>();

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
            // const data = { addPropertyInformation: { ...formData } as AddPropertyInformation };
            toast.promise(
                async () => {
                    const res = await transactionService.createRealEstateTransaction(
                        formData as AddPropertyInformation,
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
    console.log('printing errors: ', errors);

    return (
        <FormProvider {...methods}>
            <Form methods={methods} register={register} onSubmit={handleSubmit(onSave)}>
                {/* <SuccessAlert message='Successfully updated' /> */}
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='col-span-full mb-8'>
                        <SectionHeader text={'LRFO Requirement'} />

                        <label>
                            Agent Current AOR
                            <select
                                {...register('agentAOR', { required: true })}
                                className={`${errors.agentAOR ? 'ring-1 ring-red-500' : ''}`}>
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
                            <TextInputField
                                name='propertyAddress'
                                label='New Property Address'
                                control={control}
                                error={errors.propertyAddress}
                                className='col-span-full'
                            />

                            <label className={'sm:col-span-2'}>
                                <span>City</span>
                                <input
                                    type='text'
                                    {...register('city', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.city?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>State</span>
                                <input
                                    type='text'
                                    {...register('state', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.state?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Zipcode</span>
                                <input
                                    type='text'
                                    {...register('zipcode', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.zipcode?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Client First Name</span>
                                <input
                                    type='text'
                                    {...register('clientFirstName', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.clientFirstName?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Client Last Name</span>
                                <input
                                    type='text'
                                    {...register('clientLastName', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.clientLastName?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Client Last Name</span>
                                <input
                                    type='text'
                                    {...register('clientLastName', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.clientLastName?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Client Email</span>
                                <input
                                    type='text'
                                    {...register('clientEmail', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}
                                />
                                <p className='text-red-500'>{errors?.clientEmail?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Property Type</span>
                                <select
                                    {...register('propertyType', { required: true })}
                                    className={`${errors.city ? 'ring-1 ring-red-500' : ''}`}>
                                    <option value=''>Please select</option>
                                    {propertyType.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.title}
                                        </option>
                                    ))}
                                </select>
                                <p className='text-red-500'>{errors?.propertyType?.message}</p>
                            </label>

                            <label className={'sm:col-span-2'}>
                                <span>Transaction Type</span>
                                {/* TODO: figure out where else required is applying */}
                                <select
                                    {...register('transactionType')}
                                    // FIXME: why doesn't this work
                                    className={`${errors.transactionType ? 'ring-1 ring-red-500' : ''}`}>
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
                            <label className='sm:col-span-2'>
                                <span>Primary Agent</span>
                                <input
                                    type='text'
                                    {...register('primaryAgent', { required: true })}
                                    className={`${errors.primaryAgent ? 'ring-1 ring-red-500' : ''}`}
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
