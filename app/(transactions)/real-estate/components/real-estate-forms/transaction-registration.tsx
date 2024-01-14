import Form from '@/app/components/form-components/form';
import { Toaster } from '@/components/ui/sonner';
import { TransactionRegistration } from '@/sanity/schemas/real-estate-transaction.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<TransactionRegistration> = z.object({
    transactionType: z.string(),
    newListingSale: z.object({
        // FIXME: zod date types won't work. might have to parse the strings manually
        listingDate: z.string(),
        expirationDate: z.string(),
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

    function onSubmit() {
        toast.loading('Loading...');

        toast.success('Successfully updated');
    }

    return (
        <FormProvider {...methods}>
            <Form methods={methods} onSubmit={onSubmit}>
                <Toaster richColors />
                <div></div>
            </Form>
        </FormProvider>
    );
}
