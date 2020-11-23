import { DocumentType } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

import { UserDocumentClass } from '../../services/Mongo/User';
import jwt from 'jsonwebtoken';
import { addMinutes, addSeconds, getUnixTime } from 'date-fns';

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    @Field()
    admin: boolean;

    @Field()
    email: string;

    static createFromDocument(user: DocumentType<UserDocumentClass>): User {
        const created = new User();
        created.id = user._id;
        created.firstName = user.firstName;
        created.lastName = user.lastName;
        created.username = user.username;
        created.email = user.email;
        created.admin = user.admin;
        return created;
    }

    public jwtExpiration(date: Date): number {
        return getUnixTime(addMinutes(date, 180));
    }

    public generateJWT(date: Date): string {
        return jwt.sign(
            {
                iss: 'gaildoaneoriginals',
                iat: getUnixTime(new Date()),
                exp: this.jwtExpiration(date),
                user: this,
            },
            process.env.SECRET_KEY
        );
    }
}
