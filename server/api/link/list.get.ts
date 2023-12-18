import { db } from "~/db";
import { eq } from "drizzle-orm";
import { link } from "~/db/schema/link";
export default defineProtectedEventHandler(async event => {
    return await db.query.link.findMany({
        where: eq(link.profileId, event.context.user!.userId),
    });
});
