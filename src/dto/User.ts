import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @Length(3, 30)
    name: string

    @IsNotEmpty()
    @Length(3, 80)
    lastname: string

    @IsNotEmpty()
    age: number
}

export class UpdateUserDTO extends CreateUserDTO {
    id: string
}