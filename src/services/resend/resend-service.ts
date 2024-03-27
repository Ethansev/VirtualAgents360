import EmailTemplate from '@/components/email/email-template';
import { Resend } from 'resend';

export async function test() {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
    console.log('printing resend', resend);

    try {
        console.log('trying to send an email now...');
        const { data, error } = await resend.emails.send({
            from: 'ethan@virtualagents360.ethanwin.com',
            // from: 'Acme <onboarding@resend.dev>',
            // to: ['delivered@resend.dev'],
            to: ['sevadus98@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'John' }),
        });

        if (error) {
            console.log('here is error from resend service', error);
            return error;
        }

        console.log('here is data from resend service', data);
        return data;
    } catch (err) {
        console.log('error from resend service', err);
        return err;
    }
}
