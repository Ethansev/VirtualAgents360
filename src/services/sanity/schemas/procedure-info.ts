import { defineArrayMember, defineField, defineType } from '@sanity-typed/types';

export const procedureInfo = defineType({
    name: 'procedure_info',
    title: 'Important Info & Procedures',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                            { title: 'Underline', value: 'underline', icon: () => 'U' },
                        ] as const,
                    },
                }),
            ],
        }),
    ],
});
