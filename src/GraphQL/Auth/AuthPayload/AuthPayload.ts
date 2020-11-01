import { User } from '@src/GraphQL/User/User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthPayload {
    @Field()
    token: string;

    @Field(() => User)
    user: User;
}

export interface IJWT {
    iss: string;
    iat: number;
    exp: number;
    user: User;
}
