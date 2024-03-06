'use client';

import { transactionService } from '@/app/api/transactions/transaction-services';
import Form from '@/app/components/form-components/form';
import SectionHeader from '@/app/components/form-components/section-header';
import { numberValidation, stringWithMinLength } from '@/app/utils/utils';
import { Toaster } from '@/components/ui/sonner';
import {
    OpenEscrowListing,
    OpenEscrowSale,
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
    smartBuyList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<OpenEscrowListing> = z.object({
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
    openEscrowDate: stringWithMinLength(),
    estimatedClosingDate: stringWithMinLength(),
    salePrice: numberValidation(),
    sellingOffice: stringWithMinLength(),
    sellingAgent: stringWithMinLength(),
    sellingEmail: stringWithMinLength(),
    sellingPhone: stringWithMinLength(), // TODO: create phone validation util
    escrowCompany: stringWithMinLength(),
    escrowOfficer: stringWithMinLength(),
    escrowEmail: stringWithMinLength(),
    escrowPhone: stringWithMinLength(),
    titleCompany: stringWithMinLength(),
    titleOfficer: stringWithMinLength(),
    titleEmail: stringWithMinLength(),
    titlePhone: stringWithMinLength(),
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
                const res = await transactionService.updateRealEstateTransaction(data);
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
                        <SectionHeader text={'LRFO Requirement'} />
                        {/* <TextInputField */}
                        {/*     name='listingDate' */}
                        {/*     label='Listing Date' */}
                        {/*     control={control} */}
                        {/*     error={errors.listingDate} */}
                        {/*     className='col-span-full' */}
                        {/* /> */}
                        {/**/}
                        {/* <TextInputField */}
                        {/*     name='expirationDate' */}
                        {/*     label='Expiration Date' */}
                        {/*     control={control} */}
                        {/*     error={errors.expirationDate} */}
                        {/*     className='sm:col-span-2' */}
                        {/* /> */}
                        {/**/}
                        {/* <NumberInputField */}
                        {/*     name='mlsNumber' */}
                        {/*     label='MLS Number' */}
                        {/*     control={control} */}
                        {/*     error={errors.mlsNumber} */}
                        {/*     className='sm:col-span-2' */}
                        {/* /> */}
                    </div>
                    {/* <div className='mb-8'> */}
                    {/*     <SectionHeader text={'Agent Information'} />{' '} */}
                    {/*     <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'></div> */}
                    {/* </div> */}
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
