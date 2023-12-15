import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { account } from "./account";

export const profile = sqliteTable("profile", {
    id: text("id").primaryKey(),
    first_name: text("first_name"),
    last_name: text("last_name"),
    accountId: text("accountId").references(() => account.id),
});

export type Profile = typeof profile.$inferSelect;
export type ProfilePayload = typeof profile.$inferInsert;
