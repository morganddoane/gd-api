import { Carrier } from '@src/GraphQL/Carrier/Carrier';
import { Package } from '@src/GraphQL/Package/Package';
import { Rate } from '@src/GraphQL/Rate/Rate';
import { RateInput } from '@src/GraphQL/Rate/RateInput';
import { ShipService } from '@src/GraphQL/ShipService/ShipService';
import {
    RESTDataSource,
    RequestOptions,
    HTTPCache,
} from 'apollo-datasource-rest';

export class ShipstationClass extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://ssapi.shipstation.com/';
        this.httpCache = new HTTPCache();
    }

    willSendRequest(req: RequestOptions): void {
        req.headers.set('Authorization', process.env.SHIPSTATION_KEY);
    }

    async getCarriers(): Promise<Carrier[]> {
        const res = await this.get(`carriers`);
        return res.map((c) => {
            const carrier = new Carrier();
            Object.keys(c).forEach((key) => {
                carrier[key] = c[key];
            });
            return carrier;
        });
    }

    async getPackages(carrierCode: string): Promise<Package[]> {
        const res = await this.get(
            `carriers/listPackages?carrierCode=${carrierCode}`
        );
        return res.map((p) => {
            const _package = new Package();
            Object.keys(p).forEach((key) => {
                _package[key] = p[key];
            });
            return _package;
        });
    }

    async getServices(carrierCode: string): Promise<ShipService[]> {
        const res = await this.get(
            `carriers/listservices?carrierCode=${carrierCode}`
        );
        return res.map((s) => {
            const service = new ShipService();
            Object.keys(s).forEach((key) => {
                service[key] = s[key];
            });
            return service;
        });
    }

    async getRates(data: RateInput): Promise<Rate[]> {
        const res = await this.post('/shipments/getrates', { ...data });
        return res.map((r) => {
            const rate = new Rate();
            Object.keys(r).forEach((key) => {
                rate[key] = r[key];
            });
            return rate;
        });
    }
}
