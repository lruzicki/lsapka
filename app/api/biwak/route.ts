import { NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';

const emailService = new EmailService(process.env.AZURE_COMMUNICATION_CONNECTION_STRING!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      termin, 
      miejsce, 
      odjazd, 
      przyjazd, 
      maxOsob, 
      druzyny, 
      osobaOdpowiedzialna, 
      opiekunowie, 
      osobyPelnnoletnie,
      transportZgloszony, 
      transportOsob,
      koszt,
      numeryKontaktowe,
      checklist,
      submittedBy,
      submittedByEmail
    } = body;

    const checklistItems = Object.entries(checklist)
      .filter(([_, checked]) => checked)
      .map(([item, _]) => item)
      .join(', ');

    const subject = `Zgłoszenie biwaku - ${termin} - ${miejsce}`;
    
    const emailContent = `
      <html>
        <body>
          <h2>Nowe zgłoszenie biwaku</h2>
          
          <h3>Podstawowe informacje:</h3>
          <ul>
            <li><strong>Termin:</strong> ${termin}</li>
            <li><strong>Miejsce:</strong> ${miejsce}</li>
                            <li><strong>Komendant:</strong> ${osobaOdpowiedzialna}</li>
            <li><strong>Drużyny:</strong> ${druzyny}</li>
            <li><strong>Maksymalna ilość osób:</strong> ${maxOsob}</li>
          </ul>

          <h3>Transport:</h3>
          <ul>
            <li><strong>Miejsce i godzina odjazdu:</strong> ${odjazd}</li>
            <li><strong>Miejsce i godzina przyjazdu:</strong> ${przyjazd}</li>
            <li><strong>Transport zgłoszony:</strong> ${transportZgloszony ? 'Tak' : 'Nie'}</li>
            ${transportZgloszony ? `<li><strong>Liczba osób w transporcie:</strong> ${transportOsob}</li>` : ''}
          </ul>

          <h3>Opiekunowie:</h3>
          <p>${opiekunowie}</p>
          
          ${osobyPelnnoletnie ? `<h3>Osoby pełnoletnie:</h3><p>${osobyPelnnoletnie}</p>` : ''}
          
          <h3>Koszt:</h3>
          <p>${koszt}</p>
          
          <h3>Numery kontaktowe:</h3>
          <p>${numeryKontaktowe}</p>

          <h3>Checklista (zaznaczone elementy):</h3>
          <p>${checklistItems || 'Brak zaznaczonych elementów'}</p>

          <hr>
          <p><strong>Zgłoszono przez:</strong> ${submittedBy} (${submittedByEmail})</p>
          <p><strong>Data zgłoszenia:</strong> ${new Date().toLocaleString('pl-PL')}</p>
        </body>
      </html>
    `;

    await emailService.sendEmail(process.env.BIWAK_NOTIFICATION_EMAIL || "lruzicki@lesnaszkolka.org", subject, {
      name: submittedBy || "System",
      email: submittedByEmail || "system@lesnaszkolka.org",
      message: emailContent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in biwak API:', error);
    return NextResponse.json(
      { error: 'Failed to send biwak notification' },
      { status: 500 }
    );
  }
} 