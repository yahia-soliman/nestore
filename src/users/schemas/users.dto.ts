import { PartialType } from "@nestjs/mapped-types";
import {
    IsAlpha, IsDateString, IsNotEmpty, IsUUID,
    Length, IsNumber, IsPositive, IsEmail, IsOptional,
    IsNumberString
} from "class-validator";

export class CreateUserDto {

    @IsAlpha() @Length(3, 64) @IsNotEmpty()
    name: string;

    @IsNumber() @IsPositive()
    age: number;

    @IsEmail()
    email: string;

    @IsNumberString()
    @Length(11, 11, {message:"Phone number mush be exactly 11 characters"})
    phone: String

    @IsDateString() @IsOptional()
    created_at?: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}