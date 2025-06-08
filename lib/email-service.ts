import { EmailClient } from "@azure/communication-email";

export class EmailService {
  private emailClient: EmailClient;
  
  constructor(connectionString: string) {
    this.emailClient = new EmailClient(connectionString);
  }

  async sendEmail(to: string, subject: string, content: {
    name: string,
    email: string,
    message: string
  }) {
    const message = {
      senderAddress: "DoNotReply@lesnaszkolka.org",
      content: {
        subject: subject,
        plainText: `Od: ${content.name} (${content.email})\n\nWiadomość: ${content.message}`,
        html: `
          <html>
            <body>
              <h3>Nowa wiadomość od: ${content.name}</h3>
              <p>Email kontaktowy: ${content.email}</p>
              <p>Treść wiadomości:</p>
              <p>${content.message}</p>
            </body>
          </html>
        `
      },
      recipients: {
        to: [
          {
            address: to
          }
        ]
      }
    };

    try {
      const poller = await this.emailClient.beginSend(message);
      const result = await poller.pollUntilDone();
      return result;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
} 