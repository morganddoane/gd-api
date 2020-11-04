import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AttendeeAddress {
    @Field({ nullable: true })
    home?: EventbriteAddress;

    @Field({ nullable: true })
    ship?: EventbriteAddress;

    @Field({ nullable: true })
    work?: EventbriteAddress;
}

@ObjectType()
export class EventbriteAddress {
    @Field({ nullable: true })
    address_1?: string;

    @Field({ nullable: true })
    address_2?: string;

    @Field({ nullable: true })
    city?: string;

    @Field({ nullable: true })
    region?: string;

    @Field({ nullable: true })
    postal_code?: string;

    @Field({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    latitude?: number;

    @Field({ nullable: true })
    longitude?: number;

    @Field({ nullable: true })
    localized_address_display?: string;

    @Field({ nullable: true })
    localized_area_display?: string;

    @Field({ nullable: true })
    localized_multi_line_address_display?: string[];
}
