import { Resend } from 'resend';

// Ensure we have an API key, even if undefined - Resend will handle the error appropriately
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function sendLeadThankYouEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'Nigaran Solar <no-reply@nigaransolar.com>',
      to: email,
      subject: 'Thank You for Your Interest in Solar Energy',
      html: `
        <h1>Thank you, ${name}!</h1>
        <p>We've received your inquiry about solar energy solutions. Our team will review your requirements and get back to you shortly.</p>
        <p>In the meantime, you can learn more about our services on our website.</p>
        <p>Best regards,<br>The Nigaran Solar Team</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send lead thank you email:', error);
    throw error;
  }
}

export async function sendJobApplicationConfirmation(email: string, name: string, position: string) {
  try {
    await resend.emails.send({
      from: 'Nigaran Solar Careers <careers@nigaransolar.com>',
      to: email,
      subject: 'Application Received - Nigaran Solar',
      html: `
        <h1>Thank you for applying, ${name}!</h1>
        <p>We've received your application for the ${position} position at Nigaran Solar.</p>
        <p>Our hiring team will review your application and contact you if your qualifications match our requirements.</p>
        <p>Best regards,<br>Nigaran Solar HR Team</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send job application confirmation:', error);
    throw error;
  }
}