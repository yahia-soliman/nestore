import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class User
{
    @Prop({
        required: true,
        minlength: 3,
        maxlength: 64,
    })
    name: string;

    @Prop({
        unique: true,
        required: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    })
    email: string

    @Prop({length:11})
    phone: string;

    @Prop()
    age: number;

    @Prop()
    created_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);