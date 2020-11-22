import {
    ShipmentDocumentClass,
    ShipmentStatus,
} from '@src/services/Mongo/Shipment';
import { UserDocumentClass } from '@src/services/Mongo/User';
import { DocumentType, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../User/User';

@ObjectType()
export class Shipment {
    @Field(() => ID)
    id: string;

    @Field(() => User)
    processedBy: User;

    @Field()
    attendee: string;

    @Field()
    shipmentId: string;

    @Field({ nullable: true })
    labelData?: string;

    @Field(() => ShipmentStatus)
    status: ShipmentStatus;

    processedById: Ref<UserDocumentClass, Types.ObjectId>;

    static createFromDocument(
        shipment: DocumentType<ShipmentDocumentClass>
    ): Shipment {
        const created = new Shipment();
        created.id = shipment._id;
        created.attendee = shipment.attendee;
        created.shipmentId = shipment.shipmentId;
        created.labelData = shipment.labelData;
        created.status = shipment.status;
        created.processedById = shipment.processedBy;

        return created;
    }
}
