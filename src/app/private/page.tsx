import { createClientInBrowser } from '@/services/supabase/auth-client-utils';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
    const supabase = createClientInBrowser();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/');
    }

    return <p>Hello {data.user.email}</p>;
}
