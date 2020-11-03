import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Rate } from './Rate';
import { RateInput } from './RateInput';
import { ShipstationClass } from '../../services/Shipstation';

const Shipstation = new ShipstationClass();

@Resolver(() => Rate)
export class RateResolver {
    @Authorized()
    @Query(() => [Rate])
    async rates(@Arg('data') data: RateInput): Promise<Rate[]> {
        return await Shipstation.getRates(data);
    }
}
