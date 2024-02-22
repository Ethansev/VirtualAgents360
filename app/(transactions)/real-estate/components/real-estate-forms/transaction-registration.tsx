import Form from '@/app/components/form-components/form';
import NumberInputField from '@/app/components/form-components/number-input-field';
import SectionHeader from '@/app/components/form-components/section-header';
import { Toaster } from '@/components/ui/sonner';
import { TransactionRegistration } from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema: z.ZodType<TransactionRegistration> = z.object({
    transactionType: z.string(),
    newListingSale: z.object({
        // FIXME: date is set as string in sanity. will have to do extra checks ourselves here
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

    // const [success, setSuccess] = useState(false);
    // const [loading, setLoading] = useState(false);

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
            <Form register={register} onSubmit={onSubmit}>
                <Toaster richColors />
                {/* I guess I should do new listing registration - for sale first huh  */}
                <div className='space-y-12'>
                    <div className='mb-8'>
                        <SectionHeader text='Smart-Buy Combo Questionnaire' />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            {/* <SelectInputField */}
                            {/*     name='smart-buy-1' */}
                            {/*     label='Is your client interested in assistance with home financing?' */}
                            {/*     options={[]} */}
                            {/*     className='col-span-full' */}
                            {/* /> */}
                            {/* <SelectInputField */}
                            {/*     name='smart-buy-2' */}
                            {/*     label='Would you like to team up with an in-house Mortgage Loan Originator (MLO) to pre-qualify your client and assist with the loan application?' */}
                            {/*     options={[]} */}
                            {/*     className='col-span-full' */}
                            {/* /> */}
                            {/* <SelectField */}
                            {/*     name='smart-buy-3' */}
                            {/*     label='Are you aware that the Smart-Buy Combo program offers the benefit of additional compensation?' */}
                            {/*     options={[]} */}
                            {/*     className='col-span-full' */}
                            {/* /> */}
                            {/* <SelectField */}
                            {/*     name='smart-buy-4' */}
                            {/*     label='In your opinion, what are the benefits of closing both real estate and mortage transactions under one roof?' */}
                            {/*     options={[]} */}
                            {/*     className='col-span-full' */}
                            {/* /> */}
                        </div>
                    </div>

                    <div className='mb-8'>
                        <SectionHeader text='Listing Information' />
                        <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                            {/* TODO: update as date field component */}
                            {/* <TextInputField */}
                            {/*     name={register('newListingSale.listingDate').name} */}
                            {/*     label={'Listing Date'} */}
                            {/*     className='col-span-2' */}
                            {/* /> */}
                            {/* TODO: update as date field component */}
                            {/* <TextInputField */}
                            {/*     name={register('newListingSale.expirationDate').name} */}
                            {/*     label={'Expiration Date'} */}
                            {/*     className='col-span-2' */}
                            {/* /> */}
                            <NumberInputField
                                name={register('newListingSale.mlsNumber').name}
                                label='MLS#'
                                className='col-span-2'
                            />
                            <NumberInputField
                                name={register('newListingSale.listingPrice').name}
                                label='Listing Price'
                                className='col-span-2'
                            />
                            <NumberInputField
                                name={register('newListingSale.listingOfficeCompPercentage').name}
                                label='Listing Office Comp %'
                                className='col-span-2'
                            />
                            <NumberInputField
                                name={register('newListingSale.listingOfficeCompAmount').name}
                                label='Listing Office Comp $'
                                className='col-span-2'
                            />
                            {/* <TextInputField */}
                            {/*     name={register('newListingSale.sellersFirstName').name} */}
                            {/*     label={"Seller's First Name"} */}
                            {/*     className='col-span-2' */}
                            {/* /> */}
                            {/* <TextInputField */}
                            {/*     name={register('newListingSale.sellersLastName').name} */}
                            {/*     label={"Seller's Last Name"} */}
                            {/*     className='col-span-2' */}
                            {/* /> */}
                            {/* <TextInputField */}
                            {/*     name={register('newListingSale.sellersEmailAddress').name} */}
                            {/*     label={"Seller's Email Address"} */}
                            {/*     className='col-span-2' */}
                            {/* /> */}
                            {/* TODO: update this to be an email validated input field  */}
                            {/* <TextInputField */}
                            {/*     name={register('newListingSale.specialInstructions').name} */}
                            {/*     label={'Special Instructions'} */}
                            {/*     className='col-span-full' */}
                            {/* /> */}
                        </div>
                    </div>
                </div>
            </Form>
        </FormProvider>
    );
}
