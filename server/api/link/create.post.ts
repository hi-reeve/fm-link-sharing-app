import { ProfileLink, link } from "@/db/schema/link";
import { db } from "~/db";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
export default defineProtectedEventHandler(async event => {
    const body = await readBody<Omit<ProfileLink, "profileId" | "id">[]>(event);

    const existing = await db.query.link.findMany({
        where: eq(link.profileId, event.context.user!.userId),
    });

    if (existing.length)
        await db
            .delete(link)
            .where(eq(link.profileId, event.context.user!.userId));

    if (body.length === 0) return;

    const newLinks = await db.insert(link).values(
        body.map(i => ({
            ...i,
            profileId: event.context.user!.userId,
            id: nanoid(),
        }))
    );
    setResponseStatus(event, 201);
    return newLinks;
});
