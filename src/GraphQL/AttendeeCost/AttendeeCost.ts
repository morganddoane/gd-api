import { Field, ObjectType } from 'type-graphql';
import { Currency } from '../Currency/Currency';

@ObjectType()
export class AttendeeCost {
    @Field(() => Currency)
    base_price: Currency;

    @Field(() => Currency)
    eventbrite_fee: Currency;

    @Field(() => Currency)
    tax: Currency;

    @Field(() => Currency)
    payment_fee: Currency;

    @Field(() => Currency)
    gross: Currency;
}
