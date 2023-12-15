import { db } from "~/db";
import { type Account, account } from "~/db/schema/account";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
export default defineEventHandler(async event => {
    const { email, password } = await readBody<
        Pick<Account, "email" | "password">
    >(event);

    const isExists = await db.query.account.findFirst({
        where: eq(account.email, email),
    });

    if (!isExists)
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid credentials",
        });

    const isMatch = await compare(password, isExists.password);

    if (!isMatch)
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid credentials",
        });

    const config = useRuntimeConfig();

    const session = serialize({ userId: isExists.id });
    const signedSession = sign(session, config.cookieSecret);

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    setResponseStatus(event, 200);

    const { password: _password, ...userWithoutPassword } = isExists;
    return {
        user: userWithoutPassword,
    };
});
