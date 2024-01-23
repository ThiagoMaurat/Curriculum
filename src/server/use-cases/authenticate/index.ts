import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
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
  image: string | null;
  emailVerified: Date | null;
  roleName: Roles["name"];
  hasSendCertification: boolean | null;
} | null>;

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseInput): AuthenticateUserCaseOutput {
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
      roleName: user.role.name,
      image: user.user.image,
      hasSendCertification: user.user.hasSendCertification,
    };
  }
}
