import { profile, type Profile } from "~/db/schema/profile";
import { eq } from "drizzle-orm";
import { db } from "~/db";
export default defineProtectedEventHandler(async event => {
    const userId = event.context.user!.userId;
    const { avatar, first_name, last_name } = await readBody<
        Omit<Profile, "accountId" | "id">
    >(event);
    console.log(avatar, first_name, last_name);
    // const isProfileExists = await db.query.profile.findFirst({
    //     where: eq(profile.accountId, userId),
    // });

    // if (isProfileExists) {
    //     await db
    //         .update(profile)
    //         .set({
    //             avatar,
    //             first_name,
    //             last_name,
    //         })
    //         .where(eq(profile.accountId, userId));
    // }
});
