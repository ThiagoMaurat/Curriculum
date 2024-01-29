import { UsersRepository } from "@/server/repositories/user-repository";
import { hash } from "bcryptjs";

interface ResetPasswordSecondStepUseCaseInput {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordSecondStepUseCaseOutput {
  status: "updated" | null;
}

export class ResetPasswordSecondStepUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    code,
    password,
    confirmPassword,
  }: ResetPasswordSecondStepUseCaseInput): Promise<ResetPasswordSecondStepUseCaseOutput | null> {
    if (password !== confirmPassword) {
      throw new Error("Senhas não conferem");
    }

    const user = await this.usersRepository.checkIfUserAndPasswordCodeMatch(
      email,
      code
    );

    if (!user) {
      throw new Error("Usuário ou código inválido");
    }

    const newPassowrd = await hash(password, 6);

    const resetPassword = await this.usersRepository.updateUserByEmail(
      { password: newPassowrd },
      email
    );

    if (!resetPassword) {
      return null;
    }

    return {
      status: "updated",
    };
  }
}
