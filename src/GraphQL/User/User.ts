import { DocumentType } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

import { UserDocumentClass } from '../../services/Mongo/User';
import jwt from 'jsonwebtoken';
import { addDays, getUnixTime } from 'date-fns';

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

    public generateJWT(): string {
        return jwt.sign(
            {
                iss: 'gaildoaneoriginals',
                iat: getUnixTime(new Date()),
                exp: getUnixTime(addDays(new Date(), 1)),
                user: this,
            },
            process.env.SECRET_KEY
        );
    }
}
