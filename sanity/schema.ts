import { type SchemaTypeDefinition } from 'sanity';

import { transactions } from '@/sanity/schemas/transactions';
import { procedureInfo } from './schemas/procedure-info';
import { info } from './schemas/info';

export const schema: { types: SchemaTypeDefinition[] } = {
  // TODO: write a function that calls all the schemas in the schemas folder and returns them as an array
  types: [transactions, procedureInfo, info],
};
