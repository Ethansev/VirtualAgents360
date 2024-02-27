import { transactionService } from '@/app/api/transactions/transaction-services';
import Form from '@/app/components/form-components/form';
import SectionHeader from '@/app/components/form-components/section-header';
import TextInputField from '@/app/components/form-components/text-input-field';
import { Toaster } from '@/components/ui/sonner';
import {
    NewListingLease,
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<NewListingLease> = z.object({});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
    stage?: RealEstateTransactionStage | null;
    transactionData: RealEstateTransaction;
};

export default function NewListingLeaseForm(props: Props) {
    const { stage, transactionData } = props;
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

    function fetchForm(): FormSchema {
        return {
            listingDate: '',
            expirationDate: '',
            mlsNumber: undefined,
        };
    }
    //
    // TODO: pass this to parent callback so we could save
    async function onSave(formData: FieldValues) {
        console.log('trying to save...');
        const data = {
            ...transactionData,
            transactionRegistration: {
                transactionRegistrationType: 'newListingLease',
                newListingLease: { ...formData } as NewListingLease,
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
                {/* <SuccessAlert message='Successfully updated' /> */}
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='col-span-full mb-8'>
                        {/* <SectionHeader text={'LRFO Requirement'} /> */}
                        {/**/}
                        {/* <SelectInputField */}
                        {/*     name='' */}
                        {/*     label='Agent Current AOR' */}
                        {/*     control={control} */}
                        {/*     error={errors.agentAOR} */}
                        {/*     className='col-span-full' */}
                        {/*     options={agentAOR} */}
                        {/* /> */}
                    </div>
                    <div className='mb-8'>
                        <SectionHeader text={'Transaction Information'} />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
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

                            <TextInputField
                                name='mlsNumber'
                                label='MLS Number'
                                control={control}
                                error={errors.mlsNumber}
                                className='sm:col-span-2'
                            />
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
