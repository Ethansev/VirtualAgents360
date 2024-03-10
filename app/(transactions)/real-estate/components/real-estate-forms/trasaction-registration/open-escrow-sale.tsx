'use client';

import { updateRealEstateTransaction } from '@/app/api/transactions/transaction-services';
import Form from '@/app/components/form-components/form';
import SectionHeader from '@/app/components/form-components/section-header';
import SelectInputField from '@/app/components/form-components/select-input-field';
import TextInputField from '@/app/components/form-components/text-input-field';
import { numberValidation, priceValidation, stringWithMinLength } from '@/app/utils/utils';
import { Toaster } from '@/components/ui/sonner';
import {
    OpenEscrowSale,
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
    smartBuyComboOptions,
    smartBuyFourthOptions,
    smartBuyList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<OpenEscrowSale> = z.object({
    smartBuyCombo: z.object({
        first: z.enum(smartBuyList, {
            errorMap: () => ({ message: 'Required' }),
        }),
        second: z.enum(smartBuyList, {
            errorMap: () => ({ message: 'Required' }),
        }),
        third: z.enum(smartBuyList, {
            errorMap: () => ({ message: 'Required' }),
        }),
        fourth: z.enum(['one', 'two', 'three', 'four'], {
            errorMap: () => ({ message: 'Required' }),
        }),
    }),
    dateReceived: stringWithMinLength(),
    receivedFrom: stringWithMinLength(),
    amount1: numberValidation(),
    formOfReceipt: z.enum(['Personal Check', "Cashier's Check", 'Cash', 'Other']),

    // Trust Fund Registration - Disbursement of Funds
    disbursementDate: stringWithMinLength(),
    amount2: numberValidation(),
    escrowCompany: stringWithMinLength(),
    methodOfDisbursement: z.enum(
        ['Funds forwarded to escrow', 'Funds returned to buyer', 'Other'],
        {
            errorMap: () => ({ message: 'Required' }),
        },
    ),

    // Escrow Information
    openEscrowDate: stringWithMinLength(),
    estimatedClosingDate: stringWithMinLength(),
    salePrice: priceValidation(),
    listingOffice: stringWithMinLength(),
    listingAgent: stringWithMinLength(),
    listingEmail: stringWithMinLength(),
    listingPhone: numberValidation(),
    escrowCompany2: stringWithMinLength(),
    escrowOfficer: stringWithMinLength(),
    escrowEmail: stringWithMinLength(),
    escrowPhone: numberValidation(),
    titleCompany: stringWithMinLength(),
    titleOfficer: stringWithMinLength(),
    titleEmail: stringWithMinLength(),
    titlePhone: numberValidation(),
    specialInstructions: stringWithMinLength(),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
    stage?: RealEstateTransactionStage | null;
    transactionData: RealEstateTransaction;
};

export default function OpenEscrowSaleForm(props: Props) {
    const { stage, transactionData } = props;
    const router = useRouter();

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

    // TODO: fetch the form data from the transactionData
    function fetchForm() {
        const defaultFormValues = {
            // Not sure why I have to do it like this? Maybe because due to nesting object
            smartBuyCombo: {
                first: '' as 'Yes' | 'No',
                second: '' as 'Yes' | 'No',
                third: '' as 'Yes' | 'No',
                fourth: '' as 'one' | 'two' | 'three' | 'four',
            },
            listingDate: '',
            expirationDate: '',
            mlsNumber: '',
            listingPrice: '',
            listingOfficeCompPercentage: '',
            listingOfficeCompAmount: '',
            sellerFirstName: '',
            sellerLastName: '',
            sellerEmail: '',
            specialInstructions: '',
        };

        const newData = {
            ...defaultFormValues,
            ...transactionData?.transactionRegistration?.openEscrowListing,
        };

        return transactionData ? newData : defaultFormValues;
    }

    // TODO: pass this to parent callback so we could save
    async function onSave(formData: FieldValues) {
        console.log('trying to save...');
        const data = {
            ...transactionData,
            transactionRegistration: {
                transactionRegistrationType: 'openEscrowSale',
                openEscrowSale: { ...formData } as OpenEscrowSale,
            } as TransactionRegistration,
        };
        toast.promise(
            async () => {
                const res = await updateRealEstateTransaction(data);
                console.log('printing res from update', res);
            },
            {
                loading: 'Loading...',
                success: () => 'Successfully saved!',
                error: 'Error',
            },
        );
    }

    return (
        <FormProvider {...methods}>
            <Form register={register} onSubmit={handleSubmit(onSave)}>
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='col-span-full mb-8'>
                        <SectionHeader text={'Smart Buy Combo Questionnaire'} />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <SelectInputField
                                name='smartBuyCombo.first'
                                label='Is your client interested in assistance with home financing?'
                                control={control}
                                error={errors.smartBuyCombo?.first}
                                className='col-span-full'
                                options={smartBuyComboOptions}
                            />
                            <SelectInputField
                                name='smartBuyCombo.second'
                                label='Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?'
                                control={control}
                                error={errors.smartBuyCombo?.second}
                                className='col-span-full'
                                options={smartBuyComboOptions}
                            />
                            <SelectInputField
                                name='smartBuyCombo.third'
                                label='Are you aware that the Smart-Buy Combo program offers the benefit of additional compensation?'
                                control={control}
                                error={errors.smartBuyCombo?.third}
                                className='col-span-full'
                                options={smartBuyComboOptions}
                            />
                            <SelectInputField
                                name='smartBuyCombo.fourth'
                                label='In your opinion, what are the benefits of closing both real estate and mortgage transactions under one roof?'
                                control={control}
                                error={errors.smartBuyCombo?.fourth}
                                className='col-span-full'
                                options={smartBuyFourthOptions}
                            />
                        </div>
                    </div>

                    <div className='mb-8'>
                        <SectionHeader text={'Trust Fund Registration - Receipt of Funds'} />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <TextInputField
                                name='dateReceived'
                                label='Date Received'
                                control={control}
                                error={errors.dateReceived}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='receivedFrom'
                                label='Received From'
                                control={control}
                                error={errors.receivedFrom}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='amount1'
                                label='Amount 1'
                                control={control}
                                error={errors.amount1}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='formOfReceipt'
                                label='Form of Receipt'
                                control={control}
                                error={errors.formOfReceipt}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='disbursementDate'
                                label='Disbursement Date'
                                control={control}
                                error={errors.disbursementDate}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='amount2'
                                label='Amount 2'
                                control={control}
                                error={errors.amount2}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='escrowCompany'
                                label='Escrow Company'
                                control={control}
                                error={errors.escrowCompany}
                                className='col-span-2'
                            />
                            <TextInputField
                                name='methodOfDisbursement'
                                label='Method of Disbursement'
                                control={control}
                                error={errors.methodOfDisbursement}
                                className='col-span-2'
                            />
                        </div>
                    </div>

                    <div className='mb-8'>
                        <SectionHeader text={'Trust Fund Registration - Disbursement of Funds'} />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'></div>
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
