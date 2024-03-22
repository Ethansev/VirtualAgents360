import Form from '@/components/form-components/form';
import SectionHeader from '@/components/form-components/section-header';
import SelectInputField from '@/components/form-components/select-input-field';
import TextInputField from '@/components/form-components/text-input-field';
import { Toaster } from '@/components/ui/sonner';
import { updateRealEstateTransaction } from '@/lib/transaction/transaction-services';
import {
    NewListingSale,
    RealEstateTransaction,
    RealEstateTransactionStage,
    TransactionRegistration,
    smartBuyComboOptions,
    smartBuyFourthOptions,
    smartBuyList,
} from '@/sanity/schemas/real-estate-transaction.types';
import {
    numberValidation,
    percentageValidation,
    priceValidation,
    stringWithMinLength,
} from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// export const propertyTypeList = [
//     'sfr',
//     'condo',
//     'pud',
//     'townHome',
//     '2-4Units',
//     'residentialIncome',
//     'highRiseCondo',
//     'commercial',
//     'manufactured',
//     'vacantLot',
//     'other',
// ] as const;

const formSchema: z.ZodType<NewListingSale> = z.object({
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
    listingDate: stringWithMinLength(),
    expirationDate: stringWithMinLength(),
    mlsNumber: numberValidation(),
    listingPrice: priceValidation(),
    listingOfficeCompPercentage: percentageValidation(),
    listingOfficeCompAmount: priceValidation(),
    sellerFirstName: stringWithMinLength(),
    sellerLastName: stringWithMinLength(),
    sellerEmail: stringWithMinLength(),
    specialInstructions: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
    stage?: RealEstateTransactionStage | null;
    transactionData: RealEstateTransaction;
};

export default function NewListingSaleForm(props: Props) {
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
            ...transactionData?.transactionRegistration?.newListingSale,
        };

        return transactionData ? newData : defaultFormValues;
    }

    async function onSave(formData: FieldValues) {
        console.log('trying to save...');
        const data = {
            ...transactionData,
            transactionRegistration: {
                transactionRegistrationType: 'newListingSale',
                newListingSale: { ...formData } as NewListingSale,
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
                {/* <SuccessAlert message='Successfully updated' /> */}
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='mb-8'>
                        {/* <SectionHeader text={'New Listing Sale'} /> */}
                        <SectionHeader text={'Smart-Buy Combo Questionnaire'} />
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
                        <SectionHeader text={'Listing Information'} />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <TextInputField
                                name='listingDate'
                                label='Listing Date'
                                control={control}
                                error={errors.listingDate}
                                className='col-span-2'
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
                            <TextInputField
                                name='listingPrice'
                                label='Listing Price'
                                control={control}
                                error={errors.listingPrice}
                                className='sm:col-span-2'
                            />
                            <TextInputField
                                name='listingOfficeCompPercentage'
                                label='Listing Office Compensation %'
                                control={control}
                                error={errors.listingOfficeCompPercentage}
                                className='sm:col-span-2'
                            />
                            <TextInputField
                                name='listingOfficeCompAmount'
                                label='Listing Office Compensation $'
                                control={control}
                                error={errors.listingOfficeCompAmount}
                                className='sm:col-span-2'
                            />
                            <TextInputField
                                name='sellerFirstName'
                                label="Seller's First Name"
                                control={control}
                                error={errors.sellerFirstName}
                                className='sm:col-span-2'
                            />
                            <TextInputField
                                name='sellerLastName'
                                label="Seller's Last Name"
                                control={control}
                                error={errors.sellerLastName}
                                className='sm:col-span-2'
                            />
                            <TextInputField
                                name='sellerEmail'
                                label="Seller's Email Address"
                                control={control}
                                error={errors.sellerEmail}
                                className='sm:col-span-2'
                            />

                            {/* "A signed listing agreement has been obtained by agent and forwarded to ASC (checkbox)" */}
                            {/* Listing Agreement (file upload) */}

                            <TextInputField
                                name='specialInstructions'
                                label='Special Instructions'
                                control={control}
                                error={errors.specialInstructions}
                                className='col-span-full'
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
