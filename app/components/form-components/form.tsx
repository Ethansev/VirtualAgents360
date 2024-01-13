import React from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  methods: UseFormReturn<FieldValues>;
};

export default function Form({ children, onSubmit, methods }: Props) {
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
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
