import { Field, InputType } from 'type-graphql';
import { Dimensions } from '../Dimensions';
import { Country } from '../Enums';
import { Weight } from '../Weight';

@InputType()
export class RateInput {
    @Field()
    carrierCode: string;

    @Field({ nullable: true })
    serviceCode?: string;

    @Field({ nullable: true })
    packageCode?: string;

    @Field()
    fromPostalCode: string;

    @Field({ nullable: true })
    toState?: string;

    @Field(() => Country)
    toCountry: Country;

    @Field()
    toPostalCode: string;

    @Field({ nullable: true })
    toCity?: string;

    @Field()
    weight: Weight;

    @Field({ nullable: true })
    dimensions?: Dimensions;

    @Field({ nullable: true })
    confirmation?: Confirmation;

    @Field({ nullable: true })
    residential?: boolean;
}

enum Confirmation {
    none = 'none',
    delivery = 'delivery',
    signature = 'signature',
    adult_signature = 'adult_signature',
}
