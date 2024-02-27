'use client';

import { transactionService } from '@/app/api/transactions/transaction-services';
import SectionHeader from '@/app/components/form-components/section-header';
import SelectInputField from '@/app/components/form-components/select-input-field';
import { Toaster } from '@/components/ui/sonner';
import {
    AddPropertyInformation,
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
    transactionRegistrationTypeList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import OpenEscrowListingForm from './trasaction-registration/open-escrow-listing';

// FIXME: date is set as string in sanity. will have to do extra checks ourselves here
const formSchema: z.ZodType<TransactionRegistration> = z.object({
    transactionRegistrationType: z.enum(
        ['newListingSale', 'newListingLease', 'openEscrowSale', 'openEscrowListing'],
        {
            errorMap: () => ({ message: 'This field is required' }),
        },
    ),
    // newListingSale: z.object({
    //     listingDate: z.string(),
    //     expirationDate: z.string(),
    //     mlsNumber: z.number(),
    //     listingPrice: z.number(),
    //     listingOfficeCompPercentage: z.number(),
    //     listingOfficeCompAmount: z.number(),
    //     sellersFirstName: z.string(),
    //     sellersLastName: z.string(),
    //     sellersEmailAddress: z.string(),
    //     specialInstructions: z.string(),
    // }),
    // newListingLease: z.object({
    //     listingDate: z.string(),
    //     expirationDate: z.string(),
    //     hello: z.string(),
    // }),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
    stage?: RealEstateTransactionStage | null;
    transactionData: RealEstateTransaction;
};

export default function TransactionRegistrationForm(props: Props) {
    const { stage, transactionData } = props;
    const router = useRouter();

    // TODO: prevent form from being submitted when loading
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function fetchForm(): FormSchema {
        const defaultFormValues: FormSchema = {
            transactionRegistrationType: undefined,
            // agentAOR: '',
            // propertyAddress: '',
            // city: '',
            // state: '',
            // zipcode: '',
            // clientEmail: '',
            // clientFirstName: '',
            // clientMiddleName: '',
            // clientLastName: '',
            // propertyType: '',
            // transactionType: '',
            // primaryAgent: '',
            // coopAgent1: '',
            // coopAgent2: '',
        };

        const newData = { ...defaultFormValues, ...transactionData?.addPropertyInformation };

        return transactionData ? newData : defaultFormValues;
    }

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: fetchForm(),
    });

    const methods = useForm<FormSchema>();

    const transactionRegistrationType = watch('transactionRegistrationType');

    async function onSave(formData: FieldValues) {
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
            // TODO: add general transaction data like agent name, status, and stage here
            toast.promise(
                async () => {
                    const res = await transactionService.createRealEstateTransaction(
                        formData as AddPropertyInformation,
                    );

                    router.push(
                        `/real-estate/transaction/${res._id}/?stage=transactionRegistration`,
                    );
                    // router.push(`/real-estate/transaction/${res._id}`);
                },
                {
                    loading: 'Loading...',
                    success: () => 'Successfully saved!',
                    error: 'Error',
                },
            );
        }
    }

    return (
        <>
            <Toaster richColors />
            <div className='space-y-12'>
                <div className='col-span-full mb-8'>
                    <SectionHeader text={'Transaction Type'} />
                    <SelectInputField
                        name={'transactionRegistrationType'}
                        label={'Transaction Registration Type'}
                        control={control}
                        error={errors.transactionRegistrationType}
                        options={transactionRegistrationTypeList}
                    />
                </div>
            </div>
            {transactionRegistrationType == 'openEscrowListing' && (
                <OpenEscrowListingForm transactionData={transactionData} />
            )}
        </>
    );
}
