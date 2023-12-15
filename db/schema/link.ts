import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { profile } from "./profile";
export const linkType = {
    GITHUB: "GITHUB",
    FRONTEND_MENTOR: "FRONTEND_MENTOR",
    TWITTER: "TWITTER",
    LINKEDIN: "LINKEDIN",
    YOUTUBE: "YOUTUBE",
    FACEBOOK: "FACEBOOK",
    TWITCH: "TWITCH",
    DEVTO: "DEVTO",
    CODEWARS: "CODEWARS",
    CODEPEND: "CODEPEND",
    FREECODECAMP: "FREECODECAMP",
    GITLAB: "GITLAB",
    HASHNODE: "HASHNODE",
    STACK_OVERFLOW: "STACK_OVERFLOW",
} as const;
export type LinkType = (typeof linkType)[keyof typeof linkType];
export const linkOptions = Object.values(linkType) as [LinkType, ...LinkType[]];
export const link = sqliteTable("link", {
    id: text("id").primaryKey(),
    url: text("url").notNull(),
    title: text("title"),
    type: text("type", { enum: linkOptions }),
    profileId: text("profileId"),
});

export const linkRelations = relations(link, ({ one }) => ({
    profile: one(profile, {
        fields: [link.profileId],
        references: [profile.id],
    }),
}));

export type ProfileLink = typeof link.$inferSelect;
export type ProfileLinkPayload = typeof link.$inferInsert;
