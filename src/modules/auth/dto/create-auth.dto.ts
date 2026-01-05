import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class User {
    id: string
    username: string
    email: string
    role: string
}


