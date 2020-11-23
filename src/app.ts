import { env } from './config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker, getUserFromToken } from './auth/AuthChecker';
import { IContext } from './auth/Context';
import { UserResolvers } from './GraphQL/User/UserResolvers';

import mongoose from 'mongoose';
import express from 'express';
import { CarrierResolvers } from './GraphQL/Carrier/CarrierResolvers';
import { PackageResolvers } from './GraphQL/Package/PackageResolvers';
import { ShipServiceResolvers } from './GraphQL/ShipService/ShipServiceResolvers';
import { RateResolver } from './GraphQL/Rate/RateResolvers';
import { registerEnums } from './GraphQL/Enums';
import { EventResolvers } from './GraphQL/Event/EventResolvers';
import { ShipmentResolvers } from './GraphQL/Shipment/ShipmentResolvers';
import { AttendeeResolvers } from './GraphQL/Attendee/AttendeeResolvers';

(async () => {
    try {
        const app = express();

        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        registerEnums();
        const schema = await buildSchema({
            resolvers: [
                AttendeeResolvers,
                CarrierResolvers,
                EventResolvers,
                PackageResolvers,
                RateResolver,
                ShipmentResolvers,
                ShipServiceResolvers,
                UserResolvers,
            ],
            authChecker: authChecker,
        });

        const server = new ApolloServer({
            schema,
            context: async ({ req }) => {
                const token = req.headers.authorization || '';

                const user = await getUserFromToken(token as string);

                const context: IContext = {
                    user: user,
                };

                return context;
            },
        });

        server.applyMiddleware({
            app,
            cors: {
                origin: function (origin, callback) {
                    if (
                        origin === undefined ||
                        env.CORS_WHITELIST.includes(origin)
                    ) {
                        callback(null, true);
                    } else {
                        callback(new Error('Blocked by CORS'));
                    }
                },
                credentials: true,
            },
        });

        app.listen({ port: env.PORT }, () =>
            console.log(`Server live on port ${env.PORT} 🚀`)
        );
    } catch (error) {
        console.log(error);
    }
})();
