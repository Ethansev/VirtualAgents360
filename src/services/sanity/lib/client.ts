import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token, useCdn } from '../env';

export const client = createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn,
    ignoreBrowserTokenWarning: true,
    perspective: 'published',
});
