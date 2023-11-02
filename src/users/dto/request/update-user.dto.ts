import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'

export class UpdateUserDto {
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    password?: string;
}