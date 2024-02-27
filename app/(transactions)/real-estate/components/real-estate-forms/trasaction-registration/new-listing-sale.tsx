import Form from '@/app/components/form-components/form';
import SectionHeader from '@/app/components/form-components/section-header';
import SelectInputField from '@/app/components/form-components/select-input-field';
import TextInputField from '@/app/components/form-components/text-input-field';
import { Toaster } from '@/components/ui/sonner';
import { NewListingSale } from '@/sanity/schemas/real-estate-transaction.types';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

const formSchema: z.ZodType<NewListingSale> = z.object({
    // agentAOR: stringWithMinLength(),
    // propertyAddress: stringWithMinLength(),
    // city: stringWithMinLength(),
    // // TODO: update state when I have list of all states
    // state: stringWithMinLength(),
    // zipcode: stringWithMinLength(),
    // clientEmail: stringWithMinLength(),
    // clientFirstName: stringWithMinLength(),
    // clientMiddleName: z.string().optional(),
    // clientLastName: stringWithMinLength(),
    // propertyType: z.enum(propertyTypeList, {
    //     errorMap: () => ({ message: 'This field is required' }),
    // }),
    // transactionType: z.enum(transactionTypeList, {
    //     errorMap: () => ({ message: 'This field is required' }),
    // }),
    // primaryAgent: stringWithMinLength(),
    // coopAgent1: z.string().optional(),
    // coopAgent2: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

// type Props = {
//     stage?: RealEstateTransactionStage | null;
//     transactionData?: RealEstateTransaction | null;
// };

export default function NewListingSaleForm() {
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
                            />

                            <TextInputField
                                name='city'
                                label='City'
                                control={control}
                                error={errors.city}
                                className='sm:col-span-2'
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
