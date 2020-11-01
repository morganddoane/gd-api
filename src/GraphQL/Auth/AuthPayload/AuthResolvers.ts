import { IContext } from '@src/auth/Context';
import { UserModel } from '@src/services/Mongo/User';
import { UserInputError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { checkPassword } from '@src/utils';
import { AuthPayload } from '@src/GraphQL/Auth/AuthPayload/AuthPayload';
import { User } from '@src/GraphQL/User/User';

@Resolver(() => User)
export class UserResolvers {
    // Get user from context
    @Query(() => User, {
        description: "Get's the user from the context.",
        nullable: true,
    })
    async getUser(@Ctx() context: IContext): Promise<User> {
        if (context.user) return context.user;
        return null;
    }

    // Login user.
    @Mutation(() => AuthPayload, {
        description: 'Login a user and apply to context.',
    })
    async loginUser(
        @Ctx() context: IContext,
        @Arg('password') password: string,
        @Arg('username', { nullable: true }) username?: string,
        @Arg('email', { nullable: true }) email?: string
    ): Promise<AuthPayload> {
        if (!username && !email)
            throw new UserInputError('Please provide a username or email.');

        if (username && email)
            throw new UserInputError(
                'Please provide either a username or an email, not both.'
            );

        const loginMethod: { key: string; value: string } = {
            key: username ? 'username' : 'email',
            value: username ? username : email,
        };

        const foundUser = await UserModel.findOne({
            [loginMethod.key]: loginMethod.value,
        });

        if (!foundUser)
            throw new UserInputError(
                `Oh boy. We don't know recognize that ${
                    email ? 'email' : 'username'
                }.`
            );

        if (!checkPassword(password, foundUser.password))
            throw new UserInputError("Big woof. That's the wrong password.");

        const loggedInUser = User.createFromDocument(foundUser);

        context.user = loggedInUser;

        return {
            user: loggedInUser,
            token: loggedInUser.generateJWT(),
        };
    }
}
