import { PartialType } from "@nestjs/mapped-types";
import {
    IsAlpha, IsDateString, IsNotEmpty, IsUUID,
    Length, IsNumber, IsPositive, IsEmail, IsOptional
} from "class-validator";

export class CreateUserDto {

    @IsAlpha() @Length(3, 64) @IsNotEmpty()
    name: string;

    @IsNumber() @IsPositive() @IsNotEmpty()
    age: number;

    @IsEmail() @IsNotEmpty()
    email: string;

    @IsDateString() @IsOptional()
    createdAt?: string;

    @IsUUID() @IsOptional()
    userId?: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}