import { profile, ProfilePayload, type Profile } from "~/db/schema/profile";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { type MultiPartData } from "h3";
import { parseMultipartFormData, saveFile } from "@/utils/file";
import { account } from "~/db/schema/account";
import { nanoid } from "nanoid";
export default defineProtectedEventHandler(async event => {
    const userId = event.context.user!.userId;
    const body = await readMultipartFormData(event);
    const data = parseMultipartFormData<
        Omit<ProfilePayload, "id" | "avatar" | "accountId"> & {
            avatar: MultiPartData | string;
            email: string;
        }
    >(body!);

    let avatarDir = typeof data.avatar === "string" ? data.avatar : "";
    if (data.avatar && typeof data.avatar !== "string")
        avatarDir = await saveFile(data.avatar);

    const isProfileExists = await db.query.profile.findFirst({
        where: eq(profile.accountId, userId),
    });

    if (isProfileExists) {
        await db
            .update(profile)
            .set({
                avatar: avatarDir,
                first_name: data.first_name,
                last_name: data.last_name,
            })
            .where(eq(profile.accountId, userId));
        await db
            .update(account)
            .set({
                email: data.email,
            })
            .where(eq(account.id, userId));
    } else {
        await db.insert(profile).values({
            id: nanoid(),
            avatar: avatarDir,
            first_name: data.first_name,
            last_name: data.last_name,
            accountId: userId,
        });
        await db
            .update(account)
            .set({
                email: data.email,
            })
            .where(eq(account.id, userId));
    }
    setResponseStatus(event, 200);
    return true;
});
