import { ShipstationClass } from '@src/services/Shipstation';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Package } from './Package';

const shipstation = new ShipstationClass();

@Resolver(() => Package)
export class PackageResolvers {
    @Authorized()
    @Query(() => [Package])
    async packages(
        @Arg('carrierCode') carrierCode: string
    ): Promise<Package[]> {
        return await shipstation.getPackages(carrierCode);
    }
}
