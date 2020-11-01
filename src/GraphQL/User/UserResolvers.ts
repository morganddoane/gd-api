import { IContext } from '@src/auth/Context';
import { UserModel } from '@src/services/Mongo/User';
import { UserInputError, ForbiddenError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './User';
import { CreateUserInput, EditUserInput } from './UserInputs';
import { checkPassword, generatePasswordHash } from '@src/utils';
import { AuthPayload } from '../Auth/AuthPayload/AuthPayload';

@Resolver(() => User)
export class UserResolvers {
    // Gets user from context, which comes from JWT in the headers.
    @Authorized()
    @Query(() => User, {
        description: 'Returns logged in user based on your token.',
        nullable: true,
    })
    async getLoggedInUser(@Ctx() context: IContext): Promise<User> {
        if (context.user) {
            return context.user;
        } else {
            return null;
        }
    }

    // Create a user. Admin only.
    @Authorized('admin')
    @Mutation(() => User, {
        description:
            'Creates and returns a new user. Must be an admin to do so.',
    })
    async createUser(
        // @Authorized(['admin')
        @Arg('data')
        newUserData: CreateUserInput
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

    // Edit user. *Self* or admin only.
    @Authorized()
    @Mutation(() => User)
    async editUser(
        @Ctx() context: IContext,
        @Arg('data') data: EditUserInput,
        @Arg('id') id: string
    ): Promise<User> {
        const authorized =
            id === context.user.id || context.user.admin === true;

        if (!authorized)
            throw new ForbiddenError(
                "Sorry! You don't have permission to edit this user."
            );

        const edit = await UserModel.findByIdAndUpdate(id, data, { new: true });

        if (!edit) throw new Error('Ahh man. Failed to update user.');

        return User.createFromDocument(edit);
    }

    // Login user.
    @Mutation(() => AuthPayload)
    async loginUser(
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
