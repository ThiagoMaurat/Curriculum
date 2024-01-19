import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import { Users } from "@/db/types-schema";
import { randomUUID } from "node:crypto";
import { render } from "@react-email/render";
import { SendEmailUseCase } from "../send-email";
import AuthConfirmEmail from "@/email-templates/auth-confirm-email";
import { UsersRepository } from "@/server/repositories/user-repository";

interface RegisterUseCaseInputAndSendEmailInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
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
    confirmPassword,
  }: RegisterUseCaseInputAndSendEmailInput): Promise<Users | null> {
    if (!password || !email) {
      throw new InvalidCredentialsError();
    }

    if (password !== confirmPassword) {
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
      emailVerified: null,
      email,
      name,
      roleId: 1,
      hasSendCertification: false,
    });

    return user;
  }
}
