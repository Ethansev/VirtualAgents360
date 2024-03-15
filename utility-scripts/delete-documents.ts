import { client } from '@/sanity/lib/client';
import dotenv from 'dotenv';
dotenv.config();

// FIXME: environment variables not working? look into scripts for nextjs
function main() {
    client.delete({ query: '*[]' });
}

main();
