import { ShipmentStatus } from '@src/services/Mongo/Shipment';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ShipmentQueryParams {
    @Field({ nullable: true })
    processedBy: string;

    @Field({ nullable: true })
    attendee: string;

    @Field({ nullable: true })
    shipmentId: string;

    @Field({ nullable: true })
    labelData?: string;

    @Field(() => ShipmentStatus, { nullable: true })
    status: ShipmentStatus;
}
