import { type SchemaTypeDefinition } from 'sanity';

import { transactions } from '@/sanity/schemas/transactions';
import { procedure_info } from './schemas/procedure_info';
import { info } from './schemas/info';

export const schema: { types: SchemaTypeDefinition[] } = {
  // TODO: write a function that calls all the schemas in the schemas folder and returns them as an array
  types: [transactions, procedure_info, info],
};
