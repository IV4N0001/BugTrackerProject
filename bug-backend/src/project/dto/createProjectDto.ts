import { category } from "../project.entity"
import { user } from "src/user/user.entity"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    user: user

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    expectedCompletionAt: string
    
    @IsNotEmpty()
    category: category
}