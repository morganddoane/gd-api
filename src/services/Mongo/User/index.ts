import { getModelForClass, prop } from '@typegoose/typegoose';

export class UserDocumentClass {
    @prop()
    public firstName: string;

    @prop()
    public lastName: string;

    @prop()
    public username: string;

    @prop()
    public email: string;

    // hashed
    @prop()
    public password: string;

    @prop()
    public admin: boolean;
}

export const UserModel = getModelForClass(UserDocumentClass);
