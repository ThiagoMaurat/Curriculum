import { UsersRepository } from "@/server/repositories/user-repository";
import { randomUUID } from "node:crypto";
import { render } from "@react-email/render";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exists";
import { SendEmailUseCase } from "../../send-email";
import ResetPasswordEmail from "@/email-templates/reset-password";
import { InvalidEmailSentError } from "@/server/errors/invalid-email-sent";

interface ResetPasswordSendEmailUseCaseInput {
  email: string;
}

interface ResetPasswordSendEmailUseCaseOutput {
  status: "sent" | null;
}

export class ResetPasswordSendEmailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private sendEmailUseCase: SendEmailUseCase
  ) {}

  async execute({
    email,
  }: ResetPasswordSendEmailUseCaseInput): Promise<ResetPasswordSendEmailUseCaseOutput | null> {
    const resetPasswordUUID = randomUUID();

    const user = await this.usersRepository.getUserData(email);

    if (!user?.user) {
      throw new UserDoesNotExistsError();
    }

    await this.usersRepository.updateUserByEmail(
      { resetPasswordToken: resetPasswordUUID },
      email
    );

    const emailHtml = render(
      ResetPasswordEmail({
        validationCode: resetPasswordUUID,
        email: user.user.email,
      })
    );

    const emailSent = await this.sendEmailUseCase.execute({
      html: emailHtml,
      subject: "Redefinir senha",
      to: email,
    });

    if (emailSent.status !== "sent") {
      throw new InvalidEmailSentError();
    }

    return {
      status: "sent",
    };
  }
}
