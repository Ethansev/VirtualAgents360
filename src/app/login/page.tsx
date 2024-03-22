'use client';
import { createClient } from '@/services/supabase/client';
import { login, signup } from './actions';

export default function LoginPage() {
    function handleSignOut() {
        console.log('handling sign out...');
        const supabase = createClient();
        supabase.auth.signOut();
    }

    function handleGoogleLogin() {
        console.log('handling log in...');
        const supabase = createClient();
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: location.origin + '/auth/callback',
            },
        });
    }

    return (
        <div>
            {/* <Component /> */}
            <form>
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type='email' required />
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' required />
                <div className='flex flex-col'>
                    <button formAction={login}>Log in</button>
                    <button formAction={signup}>Sign up</button>
                </div>
            </form>
            <button onClick={handleGoogleLogin}>Google Login</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}
