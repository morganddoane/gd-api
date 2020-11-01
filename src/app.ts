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

(async () => {
    try {
        const app = express();

        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });

        const schema = await buildSchema({
            resolvers: [
                CarrierResolvers,
                PackageResolvers,
                ShipServiceResolvers,
                UserResolvers,
            ],
            authChecker: authChecker,
        });

        const server = new ApolloServer({
            schema,
            context: async ({ req }) => {
                const user = await getUserFromToken(
                    req.headers.token as string
                );

                const context: IContext = {
                    user: user,
                };

                return context;
            },
        });

        server.applyMiddleware({ app });

        app.listen({ port: env.PORT }, () =>
            console.log(`Server live on port ${env.PORT} 🚀`)
        );
    } catch (error) {
        console.log(error);
    }
})();
