export class MailService {
  sendEmail() {
    console.info('email sent');
  }
}

export const emailService = new MailService();
