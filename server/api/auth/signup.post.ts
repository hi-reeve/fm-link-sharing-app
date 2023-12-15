import { account, type Account } from "~/db/schema/account";
import { hash } from "bcrypt";
import { nanoid } from "nanoid";
import { db } from "~/db";
export default defineEventHandler(async event => {
    const { email, password } = await readBody<
        Pick<Account, "email" | "password">
    >(event);

    const hashedPassword = await hash(password, 10);

    const newAccount: Account = await db.insert(account).values({
        id: nanoid(),
        email,
        password: hashedPassword,
    });
    setResponseStatus(event, 201);
    return newAccount;
});
