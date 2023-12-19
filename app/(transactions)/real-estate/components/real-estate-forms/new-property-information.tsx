'use client';

import { transactionServices } from '@/app/api/transactions/transaction-services';
import Form from '@/app/global-components/form-components/form';
import SectionHeader from '@/app/global-components/form-components/section-header';
import SelectField from '@/app/global-components/form-components/select-field';
import TextInputField from '@/app/global-components/form-components/text-input-field';
import {
  AddPropertyInformation,
  propertyTypeList,
  transactionTypeList,
} from '@/sanity/schemas/real-estate-transaction.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

// TODO: move these to a util file
const agentAOR = [
  {
    value: 'West San Gabriel Valley Association of Realtors',
    label: 'West San Gabriel Valley Association of Realtors',
  },
  {
    value: 'Orange County Association of Realtors',
    label: 'Orange County Association of Realtors',
  },
  {
    value: 'Beverly Hills / Greater LA Association of Realtors',
    label: 'Beverly Hills / Greater LA Association of Realtors',
  },
  {
    value: 'Tri-Counties Association of Realtors',
    label: 'Tri-Counties Association of Realtors',
  },
  {
    value: 'Rancho Southeasy Association of Realtors',
    label: 'Rancho Southeasy Association of Realtors',
  },
  {
    value: 'Greater Antelope Valley Association of Realtors',
    label: 'Greater Antelope Valley Association of Realtors',
  },
  { value: 'Other', label: 'Other' },
];

const propertyTypes = [
  { value: 'SFR', label: 'SFR' },
  { value: 'Condo', label: 'Condo' },
  { value: 'PUD', label: 'PUD' },
  { value: 'Town Home', label: 'Town Home' },
  { value: '2-4 Units', label: '2-4 Units' },
  { value: 'Residential Income', label: 'Residential Income' },
  { value: 'High Rise Condo', label: 'High Rise Condo' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Manufactured', label: 'Manufactured' },
  { value: 'Vacant Lot', label: 'Vacant Lot' },
  { value: 'Other', label: 'Other' },
];

// Shares the same types from sanity schema, but we'll have to do this for each form which might get cumbersome
// TODO: doesn't look like it handles validations
const formSchema: z.ZodType<AddPropertyInformation> = z.object({
  // _type: z.string(),
  agentAOR: z.string({
    required_error: 'Missing agent current AOR',
    // invalid_type_error: 'Name must be a string'
  }),
  propertyAddress: z.string({ required_error: 'Missing property address' }),
  // invalid_type_error: 'Name must be a string'),
  city: z.string({ required_error: 'Missing city' }),
  state: z.string({ required_error: 'Missing state' }), // TODO: update this when I have list of all states
  zipcode: z.string({ required_error: 'Missing zipcode' }),
  clientEmail: z.string({ required_error: 'Missing client email' }),
  clientFirstName: z.string({ required_error: 'Missing client first name' }),
  clientMiddleName: z.string().optional(),
  clientLastName: z.string({ required_error: 'Missing client last name' }),
  propertyType: z.enum(propertyTypeList),
  transactionType: z.enum(transactionTypeList),
  primaryAgent: z.string({ required_error: 'Missing primary agent' }),
  coopAgent1: z.string().optional(),
  coopAgent2: z.string().optional(),
});

// refine for validations is really nice
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'Passwords do not match',
//   path: ['confirmPassword'],
// })

export type FormSchema = z.infer<typeof formSchema>;

export default function NewPropertyInformationForm() {
  // watch subscribes the value so that it will update on change
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  // console.log('watch: ', watch('agentAOR'));
  // console.log('watch: ', watch('propertyAddress'));
  const methods = useForm();

  function onSubmit(data: FieldValues) {
    // data = {
    //   ...data,
    //   _type: 'addPropertyInformation',
    // };
    console.log('printing data: ', data as AddPropertyInformation);
    console.log('submitting');
    transactionServices.postRealEstateTrasaction(data as FormSchema);
  }

  return (
    <FormProvider {...methods}>
      <Form methods={methods} onSubmit={onSubmit}>
        <div className='space-y-12 bg-white'>
          {/* <div className='border-b border-gray-900/10 pb-8'> */}
          <div className='col-span-full mb-8'>
            <SectionHeader text={'LRFO Requirement'} />
            <SelectField
              // pass name like this to keep strict typing
              name={register('agentAOR').name}
              label='Agent Current AOR'
              validation={{ required: true }}
              options={agentAOR}
            />
          </div>
          <div className='mb-8'>
            <SectionHeader text={'Transaction Information'} />
            <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
              <TextInputField
                name={register('propertyAddress', { required: true }).name}
                label='Property Address'
                // validation={{ required: 'Missing property address' }}
                validation={{ required: true }}
                className='col-span-full'
              />

              <TextInputField
                name={register('city').name}
                label='City'
                validation={{ required: true }}
                className='sm:col-span-2 sm:col-start-1'
              />

              <TextInputField
                name={register('state').name}
                label='State'
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <TextInputField
                name={register('zipcode').name}
                label='Zipcode'
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <TextInputField
                name={register('clientFirstName').name}
                label='Client First Name'
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <TextInputField
                name={register('clientLastName').name}
                label='Client Last Name'
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <TextInputField
                name={register('clientEmail').name}
                label='Client Email Address'
                validation={{ required: true }}
                className='sm:col-span-2 sm:col-start-1'
              />
              <SelectField
                name={register('propertyType').name}
                label='Property Type'
                options={propertyTypes}
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <SelectField
                name={register('transactionType').name}
                label='Transaction Type'
                validation={{ required: true }}
                options={propertyTypes}
                className='sm:col-span-2'
              />
            </div>
          </div>

          <div className='mb-8'>
            <SectionHeader text={'Agent Information'} />{' '}
            <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
              <TextInputField
                name={register('primaryAgent').name}
                label='Primary Agent'
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <TextInputField
                name={register('coopAgent1').name}
                label='Co-Op Agent'
                validation={{ required: true }}
                className='sm:col-span-2'
              />

              <TextInputField
                name={register('coopAgent2').name}
                label='Co-Op Agent'
                validation={{ required: true }}
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
        </div>
      </Form>
    </FormProvider>
  );
}
