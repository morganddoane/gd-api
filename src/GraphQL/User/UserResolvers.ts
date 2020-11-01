import { IContext } from '@src/auth/Context';
import { UserModel } from '@src/services/Mongo/User';
import { UserInputError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './User';
import { CreateUserInput } from './UserInputs';
import { checkPassword, generatePasswordHash } from '@src/utils';
import { AuthPayload } from '../Auth/AuthPayload/AuthPayload';

@Resolver(() => User)
export class UserResolvers {
    // Get user from context
    @Query(() => User, {
        description: "Get's the user from the context.",
        nullable: true,
    })
    async getUser(@Ctx() context: IContext): Promise<User> {
        if (context.user) {
            console.log('from context');
            return context.user;
        } else {
            console.log('else');
            return null;
        }
    }

    // Create a user. Admin only.
    @Authorized('admin')
    @Mutation(() => User, {
        description: 'Creates and returns a new user. Must be an admin.',
    })
    async createUser(
        // @Authorized(['admin')
        @Arg('data')
        newUserData: CreateUserInput,
        @Ctx() context: IContext
    ): Promise<User> {
        const duplicateUsernames = await UserModel.find({
            username: newUserData.username,
        });

        if (duplicateUsernames.length > 0)
            throw new UserInputError('Arg! That username is already taken.');

        const newUser = await UserModel.create({
            ...newUserData,
            admin: false,
            password: await generatePasswordHash(newUserData.password),
        });

        if (!newUser) throw new Error('Failed to create user');

        return User.createFromDocument(newUser);
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

        return { user: loggedInUser, token: loggedInUser.generateJWT() };
    }
}
