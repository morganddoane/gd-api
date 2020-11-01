import { env } from './config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker, getUserFromToken } from './auth/AuthChecker';
import { IContext } from './auth/Context';
import { UserResolvers } from './GraphQL/User/UserResolvers';

import mongoose from 'mongoose';

import express from 'express';
(async () => {
    try {
        const app = express();

        mongoose.connect('mongodb://localhost:27017/gaildoane', {
            useNewUrlParser: true,
        });

        const schema = await buildSchema({
            resolvers: [UserResolvers],
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
            console.log(`Server live on port ${env.PORT}`)
        );
    } catch (error) {
        console.log(error);
    }
})();
