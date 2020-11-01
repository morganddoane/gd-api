import { ShipstationClass } from '@src/services/Shipstation';
import { Authorized, Query, Resolver } from 'type-graphql';
import { Carrier } from './Carrier';

const Shipstation = new ShipstationClass();

@Resolver(() => Carrier)
export class CarrierResolvers {
    @Authorized()
    @Query(() => [Carrier], {
        description: 'Lists carriers from Shipstation.',
        nullable: true,
    })
    async carriers(): Promise<Carrier[]> {
        return await Shipstation.getCarriers();
    }
}
