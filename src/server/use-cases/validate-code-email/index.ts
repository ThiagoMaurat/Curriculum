import { EmailAlreadyVerifiedError } from "@/server/errors/email-already-verified";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import { InvalidUpdate } from "@/server/errors/invalid-update";
import { UsersRepository } from "@/server/repositories/user-repository";

type ValidateCodeEmailInput = {
  code: string;
  email: string;
};

export type ValidateCodeOutput = {
  emailVerified: Date | null;
};

export class ValidateCodeEmail {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    code,
    email,
  }: ValidateCodeEmailInput): Promise<ValidateCodeOutput> {
    const isUserAndCodeValid =
      await this.userRepository.findUserAndCheckTheEmailCode(code, email);

    if (!isUserAndCodeValid) {
      throw new InvalidCredentialsError();
    }

    if (!!isUserAndCodeValid.emailVerified) {
      throw new EmailAlreadyVerifiedError();
    }

    const updateUser = await this.userRepository.updateUser(
      {
        emailVerified: new Date(),
      },
      isUserAndCodeValid.id
    );

    if (!updateUser) {
      throw new InvalidUpdate();
    }

    return {
      emailVerified: updateUser.emailVerified,
    };
  }
}
