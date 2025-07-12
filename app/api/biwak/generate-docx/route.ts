import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, WidthType, Table, TableRow, TableCell } from 'docx';

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

    // Tworzenie dokumentu DOCX
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Tytuł
          new Paragraph({
            text: `Biwak w ${miejsce}`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
              before: 200
            }
          }),

          // Informacje dla rodziców
          new Paragraph({
            text: "Informacje dla rodziców:",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200,
              before: 200
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Termin biwaku: ",
                bold: true
              }),
              new TextRun(formattedDate)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Zakwaterowanie: ",
                bold: true
              }),
              new TextRun(miejsce)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Organizator: ",
                bold: true
              }),
              new TextRun('NKIH "Leśna Szkółka"')
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Drużyny uczestniczące: ",
                bold: true
              }),
              new TextRun(druzyny)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Dojazd: ",
                bold: true
              }),
              new TextRun(odjazd)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Zbiórka: ",
                bold: true
              }),
              new TextRun(odjazd)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Powrót: ",
                bold: true
              }),
              new TextRun(przyjazd)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Koszt: ",
                bold: true
              }),
              new TextRun(`${koszt} zł`)
            ],
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "Wpłat należy dokonywać jedynie w odliczonych banknotach i monetach. Koszt uczestnictwa obejmuje opłatę za zakwaterowanie, przejazdy, jeden gorący posiłek, wodę do mycia oraz materiały programowe.",
            spacing: { after: 300 }
          }),

          // Ekwipunek
          new Paragraph({
            text: "Ekwipunek:",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200,
              before: 200
            }
          }),

          new Paragraph({
            text: "legitymacja szkolna, latarka, notes i przybory do pisania, śpiwór, karimata, ciepła bluza bądź sweter, kubek, menażka, niezbędnik lub sztućce, przybory toaletowe, ubrania do spania, kurtka w ciemnym kolorze, czarne buty, pełne umundurowanie galowe.",
            spacing: { after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Śniadania i kolacje będą przygotowane z prowiantu, który uczestnik zabiera we własnym zakresie, wg poniższej listy: ",
                bold: true
              }),
              new TextRun("chleb krojony, dżem, ser topiony, margaryna, pasztet/paprykarz")
            ],
            spacing: { after: 300 }
          }),

          // Komendant i numery kontaktowe
          new Paragraph({
            children: [
              new TextRun({
                text: "Komendant: ",
                bold: true
              }),
              new TextRun(osobaOdpowiedzialna)
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Numery kontaktowe: ",
                bold: true
              }),
              new TextRun(numeryKontaktowe)
            ],
            spacing: { after: 300 }
          }),

          // Czuwaj
          new Paragraph({
            text: "Czuwaj!",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 200,
              before: 200
            }
          }),

          new Paragraph({
            text: osobaOdpowiedzialna,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // Separator
          new Paragraph({
            text: "-------------------------------- ✂ --------------------------------",
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
          }),

          // Zezwolenie
          new Paragraph({
            text: "ZEZWOLENIE",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: `Zezwalam mojemu/jej synowi/córce _________________ na uczestnictwo w biwaku, który odbędzie się w dniach ${formattedDate} w ${miejsce}.`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),

          new Paragraph({
            text: "_________________ podpis rodzica/opiekuna prawnego",
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // Uwaga
          new Paragraph({
            text: "UWAGA! Komendant biwaku nie ponosi odpowiedzialności finansowej za opłaty dodatkowe (mandaty), otrzymane w konsekwencji nieposiadania legitymacji szkolnej lub innego dokumentu, uprawniającego do zniżki w środkach komunikacji miejskiej.",
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          })
        ]
      }]
    });

    // Generowanie pliku DOCX
    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="biwak-${termin.replace(/[^a-zA-Z0-9]/g, '-')}-${miejsce.replace(/[^a-zA-Z0-9]/g, '-')}.docx"`
      }
    });

  } catch (error) {
    console.error('Error generating DOCX card:', error);
    return NextResponse.json(
      { error: 'Failed to generate DOCX card' },
      { status: 500 }
    );
  }
} 