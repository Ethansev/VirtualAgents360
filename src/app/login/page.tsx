'use client';
import { clientSignOut, createClientInBrowser } from '@/services/supabase/auth-client-utils';
import { login, signup } from './actions';

export default function LoginPage() {
    function handleGoogleLogin() {
        console.log('handling log in...');
        const supabase = createClientInBrowser();
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: location.origin + '/auth/callback',
            },
        });
    }

    function handleSignOut() {
        clientSignOut();
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
