import { NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';

const emailService = new EmailService(process.env.AZURE_COMMUNICATION_CONNECTION_STRING!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, recipient } = body;

    // Walidacja długości danych
    if (!name || name.length > 100) {
      return NextResponse.json(
        { error: 'Imię i nazwisko nie może być dłuższe niż 100 znaków' },
        { status: 400 }
      );
    }

    if (!subject || subject.length > 200) {
      return NextResponse.json(
        { error: 'Temat nie może być dłuższy niż 200 znaków' },
        { status: 400 }
      );
    }

    if (!message || message.length > 2000) {
      return NextResponse.json(
        { error: 'Wiadomość nie może być dłuższa niż 2000 znaków' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Nieprawidłowy adres email' },
        { status: 400 }
      );
    }

    const toEmail = recipient === 'komenda' 
    ? 'komenda@lesnaszkolka.org' 
    : 'kr@lesnaszkolka.org';

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