import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";
import { profile } from "./profile";

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const accountRelations = relations(account, ({ one }) => ({
    profile: one(profile),
}));

export type Account = typeof account.$inferSelect;
export type AccountPayload = typeof account.$inferInsert;
