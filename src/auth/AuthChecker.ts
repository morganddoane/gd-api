import { AuthChecker } from 'type-graphql';
import { IContext } from './Context';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { User } from '@src/GraphQL/User/User';
import { IJWT } from '@src/GraphQL/Auth/AuthPayload/AuthPayload';

import jwt from 'jsonwebtoken';

export const getUserFromToken = async (token: string): Promise<User | null> => {
    try {
        const data = (await jwt.verify(token, process.env.SECRET_KEY)) as IJWT;
        return data.user;
    } catch (e) {
        return null;
    }
};

export const authChecker: AuthChecker<IContext> = (
    { context: context },
    roles
) => {
    if (!context.user)
        throw new AuthenticationError("Oops! You're not logged in.");

    if (roles.includes('admin') && context.user.admin !== true)
        throw new ForbiddenError("Yikes! You don't have permission for that.");

    return true;
};
