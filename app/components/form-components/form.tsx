import { FormSchema } from '@/app/(transactions)/real-estate/components/real-estate-forms/new-property-information';
import React from 'react';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';

type Props = {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler;
    // methods: UseFormReturn<FieldValues>;
    methods: UseFormReturn<FormSchema>;
    register: UseFormRegister<FormSchema>;
};

export default function Form({ children, onSubmit, methods, register }: Props) {
    return (
        <form onSubmit={onSubmit}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return child.props.name
                        ? React.createElement(child.type, {
                              ...{
                                  ...child.props,
                                  register: register,
                                  key: child.props.name,
                              },
                          })
                        : child;
                }
                return child;
            })}
        </form>
    );
}
