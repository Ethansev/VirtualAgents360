import { type SchemaTypeDefinition } from 'sanity';

import { procedureInfo } from './schemas/procedure-info';
import { info } from './schemas/info';
import { mortgageTransactions } from './schemas/mortgage-transaction';
import { realEstateTransactions } from './schemas/real-estate-transaction';

// export const schema: { types: SchemaTypeDefinition[] } = {
//   // TODO: write a function that calls all the schemas in the schemas folder and returns them as an array
//   types: [mortgageTransactions, realEstateTransactions, procedureInfo, info],
// };

export const schema = [mortgageTransactions, realEstateTransactions];
