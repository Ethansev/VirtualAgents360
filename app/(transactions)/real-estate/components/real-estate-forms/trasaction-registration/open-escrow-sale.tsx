'use client';

import { transactionService } from '@/app/api/transactions/transaction-services';
import Form from '@/app/components/form-components/form';
import NumberInputField from '@/app/components/form-components/number-input-field';
import SectionHeader from '@/app/components/form-components/section-header';
import TextInputField from '@/app/components/form-components/text-input-field';
import { stringWithMinLength } from '@/app/utils/utils';
import { Toaster } from '@/components/ui/sonner';
import {
    OpenEscrowListing,
    OpenEscrowSale,
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<OpenEscrowListing> = z.object({
    listingDate: stringWithMinLength(),
    expirationDate: stringWithMinLength(),
    mlsNumber: z.number({
        // required_error: 'bro what are you doing',
        // invalid_type_error: 'Hello this is an invalid type error',
    }),
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
        return {
            listingData: '',
            expirationDate: '',
            mlsNumber: undefined,
        };
        // fetch the form here
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
                        <TextInputField
                            name='listingDate'
                            label='Listing Date'
                            control={control}
                            error={errors.listingDate}
                            className='col-span-full'
                        />

                        <TextInputField
                            name='expirationDate'
                            label='Expiration Date'
                            control={control}
                            error={errors.expirationDate}
                            className='sm:col-span-2'
                        />

                        <NumberInputField
                            name='mlsNumber'
                            label='MLS Number'
                            control={control}
                            error={errors.mlsNumber}
                            className='sm:col-span-2'
                        />
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
