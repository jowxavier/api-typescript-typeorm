import AppDataSource from "@/database/data-source";
import { User } from "@/entity/User";
import { Repository } from "typeorm";
import { CreateUserDTO, UpdateUserDTO } from "@/dto/User";

export class UserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find()
    }

    async create(input: CreateUserDTO): Promise<User> {
        const user = new User
        user.name = input.name
        user.lastname = input.lastname
        user.age = input.age

        return await this.repository.save(user)
    }

    async find(id: string): Promise<User|null> {
        return await this.repository.findOneBy({ id })
    }

    async update(input: UpdateUserDTO): Promise<User|null> {
        const user = await this.find(input.id)
        if (!user) {
          return null
        }

        user.name = input.name
        user.lastname = input.lastname
        user.age = input.age

        return await this.repository.save(user)
      }

    async delete(id: string) {
        await this.repository.delete(id)
    }
}