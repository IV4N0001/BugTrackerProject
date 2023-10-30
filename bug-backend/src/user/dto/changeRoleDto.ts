import { IsNotEmpty, IsString } from "class-validator"
import { role } from "../user.entity"

export class ChangeRole {
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    role: role
}