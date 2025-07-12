import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { join } from 'path';

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
      numeryKontaktowe
    } = body;

    // Konwertuj datę na format czytelny
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
      const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
                     'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
      
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} (${days[date.getDay()]})`;
    };

    const formattedDate = formatDate(termin);

    const imagePath = join(process.cwd(), 'public', 'images', 'lilijka-duza.png');
    const imageBuffer = readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Karta biwaku</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            position: relative;
            width: 210mm;
            min-height: 297mm;
          }
          .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/png;base64,${base64Image}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.3;
            z-index: -1;
          }
          .content {
            position: relative;
            z-index: 1;
          }
          h1 {
            text-align: center;
            color:rgb(23, 23, 23);
            margin-bottom: 30px;
            font-size: 24px;
          }
          .info-section {
            margin-bottom: 20px;
          }
          .info-section h2 {
            color:rgb(23, 23, 23);
            font-size: 18px;
            margin-bottom: 10px;
            border-bottom: 2px solid #374151;
            padding-bottom: 5px;
          }
          .info-item {
            margin-bottom: 8px;
            font-size: 18px;
          }
          .info-item strong {
            color:rgb(23, 23, 23);
          }
          .equipment {
            margin: 20px 0;
          }
          .equipment h3 {
            color:rgb(23, 23, 23);
            margin-bottom: 10px;
            font-size: 18px;
          }
          .equipment p {
            color:rgb(23, 23, 23);
            font-size: 18px;
            line-height: 1.6;
            margin: 0;
          }
          .permission {
            margin-top: 30px;
            padding: 20px;
          }
          .permission::before {
            content: "-------------------------------- ✂ --------------------------------";
            display: block;
            text-align: center;
            font-size: 18px;
            margin-bottom: 15px;
            color:rgb(23, 23, 23);
            letter-spacing: 2px;
          }
          .permission h3 {
            text-align: center;
            color:rgb(23, 23, 23);
            margin-bottom: 15px;
            font-size: 18px;
          }
          .permission-text {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            display: inline-block;
            width: 200px;
            margin: 0 10px;
          }
          .footer-note {
            font-size: 15px;
            color: #666;
            text-align: center;
            margin-top: 20px;
            font-style: italic;
          }
          .czuwaj {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color:rgb(23, 23, 23);
            margin: 20px 0;
          }
          .komendant {
            text-align: center;
            font-size: 20px;
            color:rgb(23, 22, 22);
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="background-image"></div>
        <div class="content">
          <h1>Biwak w ${miejsce}</h1>
          
          <div class="info-section">
            <h2>Informacje dla rodziców:</h2>
            <div class="info-item"><strong>Termin biwaku:</strong> ${formattedDate}</div>
            <div class="info-item"><strong>Zakwaterowanie:</strong> ${miejsce}</div>
            <div class="info-item"><strong>Organizator:</strong> NKIH "Leśna Szkółka"</div>
            <div class="info-item"><strong>Drużyny uczestniczące:</strong> ${druzyny}</div>
            <div class="info-item"><strong>Dojazd:</strong> ${odjazd}</div>
            <div class="info-item"><strong>Zbiórka:</strong> ${odjazd}</div>
            <div class="info-item"><strong>Powrót:</strong> ${przyjazd}</div>
            <div class="info-item"><strong>Koszt:</strong> ${koszt} zł</div>
            <div class="info-item" style="font-size: 13px; color: #666;">
              Wpłat należy dokonywać jedynie w odliczonych banknotach i monetach. 
              Koszt uczestnictwa obejmuje opłatę za zakwaterowanie, przejazdy, 
              jeden gorący posiłek, wodę do mycia oraz materiały programowe.
            </div>
          </div>

          <div class="equipment">
            <h2>Ekwipunek:</h2>
            <p>
              legitymacja szkolna, latarka, notes i przybory do pisania, śpiwór, karimata, ciepła bluza bądź sweter, kubek, menażka, niezbędnik lub sztućce, przybory toaletowe, ubrania do spania, kurtka w ciemnym kolorze, czarne buty, pełne umundurowanie galowe.
            </p>
            <p style="font-size: 18px; margin-top: 10px;">
              <strong>Śniadania i kolacje będą przygotowane z prowiantu, który uczestnik zabiera we własnym zakresie, wg poniższej listy:</strong><br>
              chleb krojony, dżem, ser topiony, margaryna, pasztet/paprykarz
            </p>
          </div>

          <div class="info-section">
            <div class="info-item"><strong>Komendant:</strong> ${osobaOdpowiedzialna}</div>
            <div class="info-item"><strong>Numery kontaktowe:</strong> ${numeryKontaktowe}</div>
          </div>

          <div class="czuwaj">Czuwaj!</div>
          <div class="komendant">${osobaOdpowiedzialna}</div>

          <div class="permission">
            <h3>ZEZWOLENIE</h3>
            <div class="permission-text">
              Zezwalam mojemu/jej synowi/córce <span class="signature-line"></span>
              na uczestnictwo w biwaku, który odbędzie się w dniach ${formattedDate} w ${miejsce}.
            </div>
            <div class="permission-text">
              <span class="signature-line"></span> podpis rodzica/opiekuna prawnego
            </div>
          </div>

          <div class="footer-note">
            UWAGA! Komendant biwaku nie ponosi odpowiedzialności finansowej za opłaty dodatkowe (mandaty), 
            otrzymane w konsekwencji nieposiadania legitymacji szkolnej lub innego dokumentu, 
            uprawniającego do zniżki w środkach komunikacji miejskiej.
          </div>
        </div>
      </body>
      </html>
    `;

    // Launch puppeteer with environment-specific configuration
    const isDocker = process.env.NODE_ENV === 'production';
    
    const browserOptions: any = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };

    // Use system Chrome only in Docker environment
    if (isDocker) {
      browserOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser';
      browserOptions.args.push(
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      );
    }

    const browser = await puppeteer.launch(browserOptions);

    const page = await browser.newPage();
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="biwak-${termin.replace(/[^a-zA-Z0-9]/g, '-')}-${miejsce.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`
      }
    });

  } catch (error) {
    console.error('Error generating biwak card:', error);
    return NextResponse.json(
      { error: 'Failed to generate biwak card' },
      { status: 500 }
    );
  }
} 