import { Field, ObjectType } from 'type-graphql';
import { AttendeeAddress } from '../AttendeeAddress/AttendeeAdress';
import { AttendeeCost } from '../AttendeeCost/AttendeeCost';
import { AttendeeProfile } from '../AttendeeProfile/AttendeeProfile';

@ObjectType()
export class Attendee {
    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    created?: Date;

    @Field({ nullable: true })
    changed?: Date;

    @Field({ nullable: true })
    ticket_class_id?: string;

    @Field({ nullable: true })
    variant_id?: string;

    @Field({ nullable: true })
    ticket_class_name?: string;

    @Field({ nullable: true })
    quantity?: number;

    @Field(() => AttendeeCost, { nullable: true })
    costs?: AttendeeCost;

    @Field(() => AttendeeProfile, { nullable: true })
    profile?: AttendeeProfile;

    // @Field()
    // questions	attendee-questions	(Optional) Custom questions for the Attendee.

    // @Field()
    // answers	attendee-answers	(Optional) Attendee's anwers to custom questions.

    // @Field()
    // barcodes	attendee-barcodes	Attendee's entry bar code.

    // @Field()
    // team	attendee-team	(Optional) Attendee team information.

    // @Field()
    // affiliate	attendee-affiliate	(Optional) Attendee’s affiliate code.

    @Field({ nullable: true })
    checked_in?: boolean;

    @Field({ nullable: true })
    cancelled?: boolean;

    @Field({ nullable: true })
    refunded?: boolean;

    @Field({ nullable: true })
    status?: string;

    @Field({ nullable: true })
    event_id?: string;

    @Field({ nullable: true })
    order_id?: string;

    @Field({ nullable: true })
    guestlist_id?: string;

    @Field({ nullable: true })
    invited_by?: string;

    @Field({ nullable: true })
    delivery_method?: string;

    @Field({ nullable: true })
    note?: string;
}
