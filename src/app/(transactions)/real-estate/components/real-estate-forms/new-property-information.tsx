'use client';

import Form from '@/components/form-components/form';
import SectionHeader from '@/components/form-components/section-header';
import SelectInputField from '@/components/form-components/select-input-field';
import TextInputField from '@/components/form-components/text-input-field';
import { Toaster } from '@/components/ui/sonner';
import {
    createRealEstateTransaction,
    updateRealEstateTransaction,
} from '@/lib/transaction/transaction-services';
import {
    PropertyInformation,
    RealEstateTransaction,
    RealEstateTransactionStage,
    agentAOR,
    propertyType,
    propertyTypeList,
    transactionType,
    transactionTypeList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { getUserClient } from '@/services/supabase/auth-client-utils';
import { stringWithMinLength } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<PropertyInformation> = z.object({
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
        errorMap: () => ({ message: 'This field is required' }),
    }),
    transactionType: z.enum(transactionTypeList, {
        errorMap: () => ({ message: 'This field is required' }),
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

    // TODO: prevent form from being submitted when loading
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUser() {
            const res = await getUserClient();
            if ('user' in res && res.user !== null) {
                setUser(res.user);
            }
        }

        getUser();
    }, []);

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

        const newData = { ...defaultFormValues, ...transactionData?.propertyInformation };

        return transactionData ? newData : defaultFormValues;
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: fetchForm(),
    });

    const methods = useForm<FormSchema>();

    async function onSave(formData: FieldValues) {
        if (transactionData) {
            const data = {
                ...transactionData,
                addPropertyInformation: { ...formData } as PropertyInformation,
            };
            toast.promise(
                async () => {
                    const res = await updateRealEstateTransaction(data);
                    console.log('printing res from update', res);
                    router.push(
                        `/real-estate/transaction/${res._id}/?stage=transactionRegistration`,
                    );
                },
                {
                    loading: 'Loading...',
                    success: () => 'Successfully saved!',
                    error: 'Error',
                },
            );
        } else {
            // TODO: add general transaction data like agent name, status, and stage here
            const newTransaction: Partial<RealEstateTransaction> = {
                propertyInformation: {
                    ...formData,
                } as PropertyInformation,
                subjectProperty: 'subjectPropertyTest',
                agent: user?.user_metadata.name,
                stage: 'addPropertyInformation',
                status: 'pending',
            };
            toast.promise(
                async () => {
                    try {
                        const res = await createRealEstateTransaction(newTransaction);

                        router.push(
                            `/real-estate/transaction/${res._id}/?stage=transactionRegistration`,
                        );
                    } catch (err) {
                        console.log('Error during createRealEstateTransaction request: ', err);
                    }
                    // router.push(`/real-estate/transaction/${res._id}`);
                },
                {
                    loading: 'Loading...',
                    success: () => 'Successfully saved!',
                    error: 'Error occurred while creating the new transaction',
                },
            );
        }
    }

    function handleCancel() {
        router.push('/real-estate');
    }

    return (
        <FormProvider {...methods}>
            <Form register={register} onSubmit={handleSubmit(onSave)}>
                {/* <SuccessAlert message='Successfully updated' /> */}
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='col-span-full mb-8'>
                        <SectionHeader text={'LRFO Requirement'} />

                        <SelectInputField
                            name='agentAOR'
                            label='Agent Current AOR'
                            control={control}
                            error={errors.agentAOR}
                            className='col-span-full'
                            options={agentAOR}
                            required={true}
                        />
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
                                required={true}
                            />

                            <TextInputField
                                name='city'
                                label='City'
                                control={control}
                                error={errors.city}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <TextInputField
                                name='state'
                                label='State'
                                control={control}
                                error={errors.state}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <TextInputField
                                name='zipcode'
                                label='Zipcode'
                                control={control}
                                error={errors.zipcode}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <TextInputField
                                name='clientFirstName'
                                label='Client First Name'
                                control={control}
                                error={errors.clientFirstName}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <TextInputField
                                name='clientLastName'
                                label='Client Last Name'
                                control={control}
                                error={errors.clientLastName}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <TextInputField
                                name='clientEmail'
                                label='Client Email'
                                control={control}
                                error={errors.clientEmail}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <SelectInputField
                                name='propertyType'
                                label='Property Type'
                                control={control}
                                error={errors.propertyType}
                                className='sm:col-span-3'
                                options={propertyType}
                                required={true}
                            />

                            <SelectInputField
                                name='transactionType'
                                label='Transaction Type'
                                control={control}
                                error={errors.transactionType}
                                className='sm:col-span-3'
                                options={transactionType}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className='mb-8'>
                        <SectionHeader text={'Agent Information'} />{' '}
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <TextInputField
                                name='primaryAgent'
                                label='Primary Agent'
                                control={control}
                                error={errors.primaryAgent}
                                className='sm:col-span-2'
                                required={true}
                            />

                            <TextInputField
                                name='coopAgent1'
                                label='Co-Op Agent 1'
                                control={control}
                                error={errors.coopAgent1}
                                className='sm:col-span-2'
                            />

                            <TextInputField
                                name='coopAgent2'
                                label='Co-Op Agent 2'
                                control={control}
                                error={errors.coopAgent2}
                                className='sm:col-span-2'
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <button
                        type='button'
                        onClick={handleCancel}
                        className='text-sm font-semibold leading-6 text-gray-900'>
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
