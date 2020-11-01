import { ShipstationClass } from '@src/services/Shipstation';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { ShipService } from './ShipService';

const shipstation = new ShipstationClass();

@Resolver(() => ShipService)
export class ShipServiceResolvers {
    @Authorized()
    @Query(() => [ShipService])
    async shipServices(
        @Arg('carrierCode') carrierCode: string
    ): Promise<ShipService[]> {
        return await shipstation.getServices(carrierCode);
    }
}

// @Resolver(() => Package)
// export class PackageResolvers {
//     @Authorized()
//     @Query(() => [Package])
//     async packages(
//         @Arg('carrierCode') carrierCode: string
//     ): Promise<Package[]> {
//         return await shipstation.getPackages(carrierCode);
//     }
// }
