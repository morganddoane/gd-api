import bcrypt from 'bcrypt';

export async function generatePasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function checkPassword(
    password: string,
    encryptedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
}

export const sleep = async (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
