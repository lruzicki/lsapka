import { NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';

const emailService = new EmailService(process.env.AZURE_COMMUNICATION_CONNECTION_STRING!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, recipient } = body;


        // // Wybór adresu email na podstawie odbiorcy
        // const toEmail = recipient === 'komenda' 
        // ? 'komenda@lesnaszkolka.pl' 
        // : 'kr@lesnaszkolka.pl';
    // Używamy testowego adresu email
    const toEmail = 'lruzicki@lesnaszkolka.org';

    await emailService.sendEmail(toEmail, subject, {
      name,
      email,
      message
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 