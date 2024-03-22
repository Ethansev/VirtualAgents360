import Form from '@/components/form-components/form';
import { Toaster } from '@/components/ui/sonner';
import { CommissionDisbursement } from '@/sanity/schemas/real-estate-transaction.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<CommissionDisbursement> = z.object({});
export type FormSchema = z.infer<typeof formSchema>;

export default function CommissionDisbursementForm() {
    const router = useRouter();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register } = useForm();
    const methods = useForm();

    function onSubmit() {
        toast.loading('Loading...');

        toast.success('Successfully updated');
    }

    return (
        <FormProvider {...methods}>
            <Form register={register} onSubmit={onSubmit}>
                <Toaster richColors />
            </Form>
        </FormProvider>
    );
}
