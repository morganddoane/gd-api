import { ShipmentModel, ShipmentStatus } from '@src/services/Mongo/Shipment';
import {
    Arg,
    Args,
    Authorized,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { Shipment } from './Shipment';
import { ShipmentQueryParams } from './ShipmentArgs';

import shipmentData from '../../services/Mongo/shipments.json';
import { UserModel } from '@src/services/Mongo/User';
import { User } from '../User/User';

@Resolver(() => Shipment)
export class ShipmentResolvers {
    @Authorized()
    @Query(() => [Shipment])
    async shipments(@Args() params: ShipmentQueryParams): Promise<Shipment[]> {
        const res = await ShipmentModel.find({ ...params });

        return res.map((s) => Shipment.createFromDocument(s));
    }

    @Authorized()
    @Query(() => Shipment)
    async shipment(@Arg('id') id: string): Promise<Shipment> {
        const res = await ShipmentModel.findById(id);

        return Shipment.createFromDocument(res);
    }

    @FieldResolver(() => User)
    async processedBy(@Root() shipment: Shipment): Promise<User> {
        const res = await UserModel.findById(shipment.processedById);

        return User.createFromDocument(res);
    }
}
