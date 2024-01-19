import Form from '@/app/components/form-components/form';
import NumberInputField from '@/app/components/form-components/number-input-field';
import SectionHeader from '@/app/components/form-components/section-header';
import SelectField from '@/app/components/form-components/select-field';
import { Toaster } from '@/components/ui/sonner';
import { TransactionRegistration } from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<TransactionRegistration> = z.object({
    transactionType: z.string(),
    newListingSale: z.object({
        // FIXME: zod date types won't work. might have to parse the strings manually
        listingDate: z.string().pipe(z.coerce.date()),
        expirationDate: z.string().pipe(z.coerce.date()),
        mlsNumber: z.number(),
        listingPrice: z.number(),
        listingOfficeCompPercentage: z.number(),
        listingOfficeCompAmount: z.number(),
        sellersFirstName: z.string(),
        sellersLastName: z.string(),
        sellersEmailAddress: z.string(),
        specialInstructions: z.string(),
    }),
});
export type FormSchema = z.infer<typeof formSchema>;

export default function TransactionRegistrationForm() {
    const router = useRouter();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const methods = useForm();

    const {
        register,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit() {
        toast.loading('Loading...');
        toast.success('Successfully updated');
    }

    return (
        <FormProvider {...methods}>
            <Form methods={methods} onSubmit={onSubmit}>
                <Toaster richColors />
                <div className='space-y-12'>
                    <div className='mb-8'>
                        <SectionHeader text='Smart-Buy Combo Questionnaire' />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <SelectField
                                name='smart-buy-1'
                                label='Is your client interested in assistance with home financing?'
                                options={[]}
                            />
                            <SelectField
                                name='smart-buy-2'
                                label='Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?'
                                options={[]}
                            />
                            <SelectField
                                name='smart-buy-3'
                                label='Are you aware that the Smart-Buy Combo program offers the benefit of additional compensation?'
                                options={[]}
                            />
                            <SelectField
                                name='smart-buy-4'
                                label='In your opinion, what are the benefits of closing both real estate and mortage transactions under one roof?'
                                options={[]}
                            />
                        </div>
                    </div>

                    <div className='mb-8'>
                        <SectionHeader text='Listing Information' />
                        {/* TODO: need a date field component for listing date */}
                        {/* TODO: need a date field component for expiration date */}
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            <NumberInputField
                                name={register('newListingSale.mlsNumber').name}
                                label='MLS#'
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </FormProvider>
    );
}
