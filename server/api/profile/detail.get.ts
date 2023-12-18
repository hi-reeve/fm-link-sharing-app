import { db } from "~/db";
import { eq, exists } from "drizzle-orm";
import { account } from "~/db/schema/account";
import { profile } from "~/db/schema/profile";
export default defineProtectedEventHandler(async event => {
    const userId = event.context.user!.userId;

    const userAccount = await db.query.account.findFirst({
        columns: {
            email: true,
        },
        where: eq(account.id, userId),
    });

    const userProfile = await db.query.profile.findFirst({
        columns: {
            first_name: true,
            last_name: true,
            avatar: true,
        },
        where: eq(profile.accountId, userId),
    });
    return {
        email: userAccount?.email,
        profile: userProfile,
    };
});
