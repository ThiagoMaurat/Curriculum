import { hash } from "bcryptjs";
import { UsersRepository } from "@/server/repositories/user-repository";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";
import { Users } from "@/db/types-schema";
import { randomUUID } from "node:crypto";
import { render } from "@react-email/render";
import { SendEmailUseCase } from "../send-email";
import AuthConfirmEmail from "@/email-templates/auth-confirm-email";

interface RegisterUseCaseInputAndSendEmailInput {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface RegisterUseCaseInputAndSendEmailOutput {
  user: Users | null;
}

export class RegisterUseCaseInputAndSendEmail {
  constructor(
    private usersRepository: UsersRepository,
    private sendEmailUseCase: SendEmailUseCase
  ) {}

  async execute({
    email,
    name,
    password,
    phone,
  }: RegisterUseCaseInputAndSendEmailInput): Promise<RegisterUseCaseInputAndSendEmailOutput | null> {
    if (!password || !email) {
      throw new InvalidCredentialsError();
    }

    const emailCode = randomUUID();

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new InvalidCredentialsError();
    }

    const emailHtml = render(AuthConfirmEmail({ validationCode: emailCode }));

    const emailSent = await this.sendEmailUseCase.execute({
      html: emailHtml,
      subject: "Confirmação de Cadastro",
      to: email,
    });

    if (emailSent.status !== "sent") {
      return null;
    }

    const user = await this.usersRepository.createUser({
      id: randomUUID(),
      password: password_hash,
      emailCodeVerified: emailCode,
      email,
      roleId: 1,
    });

    return {
      user,
    };
  }
}
