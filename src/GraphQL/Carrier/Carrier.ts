import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Carrier {
    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    accountNumber: string;

    @Field()
    requiresFundedAccount: string;

    @Field()
    balance: number;

    @Field({ nullable: true })
    nickname: string;

    @Field()
    shippingProviderId: number;

    @Field()
    primary: boolean;
}
