import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";
import { UsersRepository } from "@/server/repositories/user-repository";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exists";
import { Roles } from "@/db/types-schema";

interface AuthenticateUseCaseInput {
  email: string;
  password: string;
}

type AuthenticateUserCaseOutput = Promise<{
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  cpf: string;
  birthday: string | null;
  roleName: Roles["name"];
} | null>;

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUserCaseOutput> {
    if (!password || !email) {
      throw new InvalidCredentialsError();
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserDoesNotExistsError();
    }

    const doesPasswordMatches = await compare(password, user.user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      emailVerified: user.user.emailVerified,
      image: user.user.image,
      phone: user.user.phone,
      cpf: user.user.cpf,
      birthday: user.user.birthday,
      roleName: user.role.name,
    };
  }
}
