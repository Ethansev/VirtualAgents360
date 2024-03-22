import { createBrowserClient } from '@supabase/ssr';
import { AuthUserResponse } from './types';

export function createClientInBrowser() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
}

/**
 * @description Fetches User object on the client from supabase and parses the response
 *
 * @returns UserResponse with either a User or error.
 * */
export async function getUserClient(): Promise<AuthUserResponse> {
    try {
        const supabase = createClientInBrowser();
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
            // redirect('/');
            return { error: error };
        }
        return data;
    } catch (err) {
        console.error('Error while getting user from supabase: ', err);
        return { error: err };
    }
}

export async function clientSignOut() {
    const supabase = createClientInBrowser();
    const { error } = await supabase.auth.signOut();
}
