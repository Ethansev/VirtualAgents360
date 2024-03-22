/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import type { InferSchemaValues } from '@sanity-typed/types';
import { defineConfig } from '@sanity-typed/types';
import { apiVersion, dataset, projectId } from './src/services/sanity/env';
import { mortgageTransactionSchema } from './src/services/sanity/schemas/mortgage-transaction';
import { realEstateTransactionSchema } from './src/services/sanity/schemas/real-estate-transaction-schema';

const config = defineConfig({
    basePath: '/admin',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema: {
        types: [realEstateTransactionSchema, mortgageTransactionSchema],
    },
    plugins: [
        deskTool(),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
    ],
});

export default config;

export type SanityValues = InferSchemaValues<typeof config>;
