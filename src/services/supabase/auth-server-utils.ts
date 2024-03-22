'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { AuthUserResponse } from './types';

export async function createClientInServer() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
}

/**
 * @description Fetches User object on the server from supabase and parses the response
 *
 * @returns UserResponse with either a User or error.
 * */
export async function getUserServer(): Promise<AuthUserResponse> {
    try {
        const supabase = await createClientInServer();
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
