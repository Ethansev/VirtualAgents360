import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler;
    register: UseFormRegister<T>;
}

export default function Form<T extends FieldValues>({ children, onSubmit, register }: Props<T>) {
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
