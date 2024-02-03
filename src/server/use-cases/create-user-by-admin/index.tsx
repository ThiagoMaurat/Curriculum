import { UsersRepository } from "@/server/repositories/interfaces/user-repository";
import { Roles, Users } from "@/server/db/types-schema";
import {
  CreateUserAdmin,
  createUserAdmin,
} from "@/validators/create-user-admin";
import { render } from "@react-email/render";
import { ProductsConst } from "@/const/products";
import { UserAlreadyExists } from "@/server/errors/user-already-exist";
import { randomUUID } from "crypto";
import { SendEmailUseCase } from "../send-email";
import { RolesRepository } from "@/server/repositories/interfaces/roles-repository";
import CreatePassword from "@/email-templates/create-password";

interface CreateUserAdminUseCaseInput extends CreateUserAdmin {
  userRole: CreateUserAdmin["role"];
}

type CreateUserAdminUserCaseOutput = {
  user: Users;
  role: Roles;
};

export class CreateUserAdminUseCase {
  constructor(
    private userRepository: UsersRepository,
    private rolesRepository: RolesRepository,
    private sendEmailUseCase: SendEmailUseCase
  ) {}

  async execute({
    email,
    name,
    role,
    product,
    userRole,
  }: CreateUserAdminUseCaseInput): Promise<CreateUserAdminUserCaseOutput> {
    const validData = createUserAdmin.parse({
      email,
      name,
      role,
      product,
    });

    const permittedRolesSupervisor = ["user"];
    const permittedRolesCoordinator = [
      "coordinator",
      "user",
      "supervisor",
      "collaborator",
    ];
    const permittedRolesCollaborator = [""];
    const permittedUserRoles = [""];

    switch (userRole) {
      case "supervisor":
        if (!permittedRolesSupervisor.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
        break;
      case "coordinator":
        if (!permittedRolesCoordinator.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
        break;
      case "collaborator":
        if (!permittedRolesCollaborator.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }
      case "user":
        if (!permittedUserRoles.includes(role)) {
          throw new Error("Não possui permissão de criar esse tipo de usuário");
        }

        break;
    }

    const createPasswordToken = randomUUID();

    if (validData.role === "user" && !validData.product) {
      throw new Error("Obrigatório um produto para esse usuário");
    }

    if (
      validData.role === "user" &&
      !ProductsConst.includes(validData.product!)
    ) {
      throw new Error("Produto indisponível");
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyExists();
    }

    const emailHtml = render(CreatePassword({ createPasswordToken, email }));

    const emailSent = await this.sendEmailUseCase.execute({
      html: emailHtml,
      subject: "Confirmação de Cadastro",
      to: email,
    });

    if (emailSent.status !== "sent") {
      throw new Error("Erro ao enviar email");
    }

    const userCreated = await this.userRepository.createUser({
      id: randomUUID(),
      email: validData.email,
      name: validData.name,
      product: validData.product ?? null,
      password: null,
      emailVerified: new Date(),
      createPasswordToken,
    });

    if (!userCreated) {
      throw new Error("Erro ao criar usuário");
    }

    const roleCreated = await this.rolesRepository.insertRole({
      userId: userCreated?.id,
      name: validData.role,
    });

    if (!roleCreated) {
      throw new Error("Erro ao criar perfil");
    }

    return {
      user: userCreated,
      role: roleCreated,
    };
  }
}
