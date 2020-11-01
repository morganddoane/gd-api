import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ShipService {
    @Field()
    carrierCode: string;

    @Field()
    code: string;

    @Field()
    name: string;

    @Field()
    domestic: boolean;

    @Field()
    international: boolean;
}
