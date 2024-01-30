import { Certification } from "@/server/db/types-schema";
import { UsersRepository } from "@/server/repositories/interfaces/user-repository";
import { ParamsType, paramsSchema } from "@/validators/params-schema";

interface ListUsersByAdminUseCaseInput extends ParamsType {}

export type ListUsersByAdminUserCaseOutput = {
  metadata: {
    total: number;
    page: number;
  };
  user: {
    id: string;
    email: string;
    name: string | null;
    product: string | null;
    createdAt: Date;
    certifications: Certification[];
    roles: Array<{ name: string }>;
  }[];
};

export class ListUsersByAdminUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    limit,
    page,
    sort,
  }: ListUsersByAdminUseCaseInput): Promise<ListUsersByAdminUserCaseOutput | null> {
    const validInput = paramsSchema.parse({
      limit,
      page,
      sort,
    });

    const users = await this.userRepository.listUsers({
      ...validInput,
    });

    if (!users) {
      return null;
    }

    return users;
  }
}
