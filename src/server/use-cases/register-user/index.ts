import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import { Roles, Users } from "@/server/db/types-schema";
import { randomUUID } from "node:crypto";
import { render } from "@react-email/render";
import { SendEmailUseCase } from "../send-email";
import AuthConfirmEmail from "@/email-templates/auth-confirm-email";
import { UsersRepository } from "@/server/repositories/user-repository";
import { RolesRepository } from "@/server/repositories/roles-repository";

interface RegisterUseCaseInputAndSendEmailInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface RegisterUseCaseOutput {
  user: Users;
  role: Roles;
}

export class RegisterUseCaseInputAndSendEmail {
  constructor(
    private usersRepository: UsersRepository,
    private rolesRepository: RolesRepository,
    private sendEmailUseCase: SendEmailUseCase
  ) {}

  async execute({
    email,
    name,
    password,
    confirmPassword,
  }: RegisterUseCaseInputAndSendEmailInput): Promise<RegisterUseCaseOutput | null> {
    if (!password || !email) {
      throw new InvalidCredentialsError();
    }

    if (password !== confirmPassword) {
      throw new InvalidCredentialsError();
    }

    const emailCode = randomUUID();

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail?.user) {
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
    });

    if (!user) {
      return null;
    }

    const role = await this.rolesRepository.insertRole({
      userId: user.id,
      name: "user",
    });

    if (!role) {
      return null;
    }

    return {
      user,
      role,
    };
  }
}
