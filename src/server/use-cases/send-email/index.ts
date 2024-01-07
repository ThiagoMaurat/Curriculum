import { SendMailOptions } from "nodemailer";
import { env } from "../../../../env.mjs";
import transporter from "@/lib/node-mailer";
import { InvalidEmailSentError } from "@/server/errors/invalid-email-sent";

interface SendEmailUseCaseInput {
  to: string;
  html: any;
  subject: string;
}

export class SendEmailUseCase {
  constructor() {}

  async execute({ html, subject, to }: SendEmailUseCaseInput) {
    try {
      const options = {
        from: `${env.GMAIL_MAIL}`,
        to: `${to}`,
        subject: `${subject}`,
        html: `${html}`,
      } as SendMailOptions;

      await transporter.sendMail(options);

      return {
        status: "sent",
      };
    } catch (error) {
      throw new InvalidEmailSentError();
    }
  }
}
