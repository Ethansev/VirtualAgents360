'use client';

import SectionHeader from '@/app/components/form-components/section-header';
import SelectInputField from '@/app/components/form-components/select-input-field';
import { Toaster } from '@/components/ui/sonner';
import {
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
    transactionRegistrationTypeList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import NewListingLeaseForm from './trasaction-registration/new-listing-lease';
import NewListingSaleForm from './trasaction-registration/new-listing-sale';
import OpenEscrowListingForm from './trasaction-registration/open-escrow-listing';
import OpenEscrowSaleForm from './trasaction-registration/open-escrow-sale';

const transactionRegistrationTypes = [
    'newListingSale',
    'newListingLease',
    'openEscrowSale',
    'openEscrowListing',
] as const;
const formSchema: z.ZodType<TransactionRegistration> = z.object({
    transactionRegistrationType: z.enum(transactionRegistrationTypes, {
        errorMap: () => ({ message: 'This field is required' }),
    }),
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
        console.log('printing transaction data: ', transactionData);
        const defaultFormValues: FormSchema = {
            // @ts-ignore
            transactionRegistrationType: '',
        };

        const newData = { ...defaultFormValues, ...transactionData?.transactionRegistration };

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

    // async function onSave(formData: FieldValues) {
    //     if (transactionData) {
    //         const data = {
    //             ...transactionData,
    //             addPropertyInformation: { ...formData } as AddPropertyInformation,
    //         };
    //         toast.promise(
    //             async () => {
    //                 const res = await transactionService.updateRealEstateTransaction(data);
    //                 console.log('printing res from update', res);
    //             },
    //             {
    //                 loading: 'Loading...',
    //                 success: () => 'Successfully saved!',
    //                 error: 'Error',
    //             },
    //         );
    //     } else {
    //         // TODO: add general transaction data like agent name, status, and stage here
    //         toast.promise(
    //             async () => {
    //                 const res = await transactionService.createRealEstateTransaction(
    //                     formData as AddPropertyInformation,
    //                 );
    //
    //                 router.push(
    //                     `/real-estate/transaction/${res._id}/?stage=transactionRegistration`,
    //                 );
    //                 // router.push(`/real-estate/transaction/${res._id}`);
    //             },
    //             {
    //                 loading: 'Loading...',
    //                 success: () => 'Successfully saved!',
    //                 error: 'Error',
    //             },
    //         );
    //     }
    // }

    function renderForm() {
        switch (transactionRegistrationType) {
            case 'newListingSale':
                return <NewListingSaleForm transactionData={transactionData} />;
            case 'newListingLease':
                return <NewListingLeaseForm transactionData={transactionData} />;
            case 'openEscrowListing':
                return <OpenEscrowListingForm transactionData={transactionData} />;
            case 'openEscrowSale':
                return <OpenEscrowSaleForm transactionData={transactionData} />;
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
            {renderForm()}
        </>
    );
}
