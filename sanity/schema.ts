import { transactions } from '@/sanity/schemas/transactions';
import { type SchemaTypeDefinition } from 'sanity';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [transactions],
};
