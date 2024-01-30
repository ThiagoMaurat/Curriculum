import { hash } from "bcryptjs";
import { UsersRepository } from "@/server/repositories/interfaces/user-repository";
import { Users } from "@/server/db/types-schema";
import { createPasswordSchemaAction } from "@/validators/create-password";

interface CreatePasswordUseCaseInput {
  password: string;
  confirmPassword: string;
  email: string;
}

type CreatePasswordUserCaseOutput = {} & Users;

export class CreatePasswordUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    password,
    confirmPassword,
    email,
  }: CreatePasswordUseCaseInput): Promise<CreatePasswordUserCaseOutput | null> {
    const validInput = createPasswordSchemaAction.parse({
      password,
      confirmPassword,
      email,
    });

    const hashedPassword = await hash(validInput.password, 6);

    const user = await this.userRepository.updateUserByEmail(
      {
        password: hashedPassword,
        createPasswordToken: null,
      },
      validInput.email
    );

    return user;
  }
}
