import { User } from '@supabase/supabase-js';

export type AuthUserResponse = { user: User | null } | { error: any };

export type AuthSignOutResponse = {
    type: 'success' | 'error';
    error?: any;
};
